import express from "express";
import { UserController } from "./users.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./users.validation";

const router = express.Router();
router.post("/signin", UserController.login);
router.post(
  "/registration",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.register
);

export const UserRoute = router;
