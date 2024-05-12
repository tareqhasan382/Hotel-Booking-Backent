import { Model } from "mongoose";

export type IHotel = {
  _id?: string;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos?: string[];
  title: string;
  desc: string;
  rating?: number;
  rooms?: string[];
  cheapestPrice: number;
  featured?: boolean;
};
export type IHotelModel = Model<IHotel, Record<string, unknown>>;
