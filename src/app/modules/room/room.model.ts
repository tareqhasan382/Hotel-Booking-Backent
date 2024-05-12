import { Schema, model } from "mongoose";
import { IRoom, IRoomModel } from "./room.interface";

const roomSchema = new Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        number: { type: Number, required: true },
        unavailableDates: { type: [Date], required: true },
      },
    ],
  },
  { timestamps: true }
);

const RoomModel = model<IRoom, IRoomModel>("rooms", roomSchema);

export default RoomModel;
