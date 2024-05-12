import { Request, Response } from "express";
import UserModel from "./users.model";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
import { IUser } from "./users.interface";
import catchAsync from "../../../shared/catchAsync";

const register = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const existUser = await UserModel.findOne({ email: data.email });
    // console.log("existUser:", existUser);
    if (existUser) {
      return res.status(400).json({
        status: false,
        message: "Email Already Exist. Email must be unique",
        data: data.email,
      });
    }
    const result = await UserModel.create(data);
    // console.log("result:", result);
    return res.status(201).json({
      status: true,
      message: "Register Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
});

const login = catchAsync(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password are required" });
    }

    const user: IUser | null = await UserModel.findOne({ email }).select(
      " _id name email password "
    );
    // console.log("user:", user);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.jwt.secret as Secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ status: true, token });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong" });
  }
});

export const UserController = {
  register,
  login,
};
