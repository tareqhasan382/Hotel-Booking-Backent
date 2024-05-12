import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import HotelModel from "./hotel.model";

const createHotel = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await HotelModel.create(data);
    if (result) {
      return res.status(201).json({
        status: true,
        message: "Hotel created Successfully.",
        data: result,
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Failed to create hotel.",
      });
    }
  } catch (error) {
    console.error("Error creating hotel:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});
const getHotelData = catchAsync(async (req: Request, res: Response) => {
  try {
    const hotels = await HotelModel.find();
    if (hotels.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Hotel data retrieved successfully.",
        data: hotels,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No hotels found.",
      });
    }
  } catch (error) {
    console.error("Error retrieving hotel data:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});
const getSingleHotelData = catchAsync(async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.id;

    const hotel = await HotelModel.findById(hotelId);

    if (hotel) {
      return res.status(200).json({
        status: true,
        message: "Hotel data retrieved successfully.",
        data: hotel,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Hotel not found.",
      });
    }
  } catch (error) {
    console.error("Error retrieving hotel data:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});

const updateHotelData = catchAsync(async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.id;
    const newData = req.body;
    const updatedHotel = await HotelModel.findByIdAndUpdate(hotelId, newData, {
      new: true,
    });

    if (updatedHotel) {
      return res.status(200).json({
        status: true,
        message: "Hotel data updated successfully.",
        data: updatedHotel,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Hotel not found.",
      });
    }
  } catch (error) {
    console.error("Error updating hotel data:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});
const deleteHotelData = catchAsync(async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.id;

    const deletedHotel = await HotelModel.findByIdAndDelete(hotelId);

    if (deletedHotel) {
      return res.status(200).json({
        status: true,
        message: "Hotel data deleted successfully.",
        data: deletedHotel,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Hotel not found.",
      });
    }
  } catch (error) {
    console.error("Error deleting hotel data:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});
export const HotelController = {
  createHotel,
  getHotelData,
  getSingleHotelData,
  updateHotelData,
  deleteHotelData,
};
