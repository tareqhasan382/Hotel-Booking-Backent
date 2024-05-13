import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import RoomModel from "./room.model";
import HotelModel from "../hotel/hotel.model";

const createRoom = catchAsync(async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.id;
    const data = req.body;
    const result = await RoomModel.create(data);
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: result._id },
      });
    } catch (err) {
      throw new Error("Failed to update hotel with new room");
    }
    if (result) {
      return res.status(201).json({
        status: true,
        message: "Room created Successfully.",
        data: result,
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Failed to create Room.",
      });
    }
  } catch (error) {
    console.error("Error creating Room:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});
const getRoomData = catchAsync(async (req: Request, res: Response) => {
  try {
    const rooms = await RoomModel.find();
    if (rooms.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Room data retrieved successfully.",
        data: rooms,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No Rooms found.",
      });
    }
  } catch (error) {
    console.error("Error retrieving Room data:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});
const getSingleRoomData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.id;

      const room = await RoomModel.findById(roomId);

      if (room) {
        return res.status(200).json({
          status: true,
          message: "Room data retrieved successfully.",
          data: room,
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "Room not found.",
        });
      }
    } catch (error) {
      // console.error("Error retrieving Room data:", error);
      // return next(error);
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }
  }
);

const updateRoomData = catchAsync(async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const newData = req.body;
    const updatedRoom = await RoomModel.findByIdAndUpdate(roomId, newData, {
      new: true,
    });

    if (updatedRoom) {
      return res.status(200).json({
        status: true,
        message: "Room data updated successfully.",
        data: updatedRoom,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Room not found.",
      });
    }
  } catch (error) {
    console.error("Error updating Room data:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});
const updateRoomAvailability = catchAsync(
  async (req: Request, res: Response) => {
    try {
      await RoomModel.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates,
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err: any) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }
  }
);
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const hotelId = req.params.hotelid;

    const deletedRoom = await RoomModel.findByIdAndDelete(roomId);

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err: any) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }
    if (deletedRoom) {
      return res.status(200).json({
        status: true,
        message: "Room data deleted successfully.",
        data: deletedRoom,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Room not found.",
      });
    }
  } catch (error) {
    // console.error("Error deleting Room data:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});
export const RoomController = {
  createRoom,
  getRoomData,
  getSingleRoomData,
  updateRoomData,
  deleteRoom,
  updateRoomAvailability,
};
