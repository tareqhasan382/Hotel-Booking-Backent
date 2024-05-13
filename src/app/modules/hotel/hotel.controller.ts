import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import HotelModel from "./hotel.model";
import RoomModel from "../room/room.model";

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
    const { min, max, ...others } = req.query;

    const hotels = await HotelModel.find({
      ...others,
      cheapestPrice: {
        $gt: parseInt(min?.toString() || "1"),
        $lt: parseInt(max?.toString() || "999"),
      },
    }).limit(parseInt(req.query.limit as string));
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
const countByCity = catchAsync(async (req: Request, res: Response) => {
  try {
    const cities: string[] = (req.query.cities as string).split(",");
    const list: number[] = await Promise.all(
      cities.map((city: string) => {
        return HotelModel.countDocuments({ city });
      })
    );
    res.status(200).json(list);
  } catch (err: any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const countByType = catchAsync(async (req: Request, res: Response) => {
  try {
    const hotelCount: number = await HotelModel.countDocuments({
      type: "hotel",
    });
    const apartmentCount: number = await HotelModel.countDocuments({
      type: "apartment",
    });
    const resortCount: number = await HotelModel.countDocuments({
      type: "resort",
    });
    const villaCount: number = await HotelModel.countDocuments({
      type: "villa",
    });
    const cabinCount: number = await HotelModel.countDocuments({
      type: "cabin",
    });

    const counts = [
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ];

    res.status(200).json(counts);
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});
const getHotelRooms = catchAsync(async (req: Request, res: Response) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    const list = await Promise.all(
      hotel?.rooms?.map(async (room: string) => {
        return await RoomModel.findById(room);
      }) ?? []
    );
    res.status(200).json(list);
  } catch (err: any) {
    return res.status(404).json({
      status: false,
      message: "Hotel not found.",
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
    // console.error("Error retrieving hotel data:", error);
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
  countByCity,
  countByType,
  getHotelRooms,
};
