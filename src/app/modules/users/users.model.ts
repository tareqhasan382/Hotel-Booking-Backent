import { Schema, model } from "mongoose";
import { IUser, IUserModel } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});
const UserModel = model<IUser, IUserModel>("Users", userSchema);

export default UserModel;
