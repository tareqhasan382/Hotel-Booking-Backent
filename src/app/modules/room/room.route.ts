import express from "express";
import { RoomController } from "./room.controller";

// import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
router.get("/rooms", RoomController.getRoomData);
router.get("/room/:id", RoomController.getSingleRoomData);
router.patch("/room/:id", RoomController.updateRoomData);
router.delete("/room/:id", RoomController.deleteRoomData);
router.post("/create-room", RoomController.createRoom);

export const RoomRoute = router;
