import express from "express";
import { HotelController } from "./hotel.controller";
// import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
router.get("/hotels", HotelController.getHotelData);
router.get("/hotel/:id", HotelController.getSingleHotelData);
router.patch("/hotel/:id", HotelController.updateHotelData);
router.delete("/hotel/:id", HotelController.deleteHotelData);
router.post("/create-hotel", HotelController.createHotel);

export const HotelRoute = router;
