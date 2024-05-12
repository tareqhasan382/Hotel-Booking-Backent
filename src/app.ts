import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { UserRoute } from "./app/modules/users/users.route";
import { HotelRoute } from "./app/modules/hotel/hotel.route";
import { RoomRoute } from "./app/modules/room/room.route";

const corsOptions = {
  origin: ["*"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Applications route
app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: " Our server is Running 🚀" });
});
app.use("/api/v1", UserRoute);
app.use("/api/v1", HotelRoute);
app.use("/api/v1", RoomRoute);

//  global error handling || next => Error 4 parameter ||
// app.use(globalErrorHandler);

// route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    messase: "Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API NOT FOUND!",
      },
    ],
  });
  next();
});

export default app;