import { Model } from "mongoose";

export type IUser = {
  _id?: string;
  name: string;
  email: string;

  password: string;
};
export type IUserModel = Model<IUser, Record<string, unknown>>;
