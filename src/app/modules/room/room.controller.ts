import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import RoomModel from "./room.model";

const createRoom = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await RoomModel.create(data);
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
const getSingleRoomData = catchAsync(async (req: Request, res: Response) => {
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
    console.error("Error retrieving Room data:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});

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
const deleteRoomData = catchAsync(async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;

    const deletedRoom = await RoomModel.findByIdAndDelete(roomId);

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
    console.error("Error deleting Room data:", error);
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
  deleteRoomData,
};
