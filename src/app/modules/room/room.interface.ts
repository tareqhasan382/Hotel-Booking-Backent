import { Model } from "mongoose";

export type IRoom = {
  _id?: string;
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
  roomNumbers: { number: number; unavailableDates: Date[] }[];
};
export type IRoomModel = Model<IRoom, Record<string, unknown>>;
