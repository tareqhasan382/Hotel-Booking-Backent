import { Model } from "mongoose";

export type IUser = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
};
export type IUserModel = Model<IUser, Record<string, unknown>>;
