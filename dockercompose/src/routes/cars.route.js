import express from "express";
import {
  getCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
  rentCar,
  returnCar,
  getAvailableCars,
  getUnavailableCars
} from "../controller/car.controller.js";

const carRoutes = express.Router();

carRoutes.route("/").get(getCars).post(createCar);

carRoutes.route("/available").get(getAvailableCars);

carRoutes.route("/unavailable").get(getUnavailableCars);

carRoutes.route("/rent/:id").put(rentCar);

carRoutes.route("/return/:id").put(returnCar);

carRoutes.route("/:id").get(getCar).put(updateCar).delete(deleteCar);

export default carRoutes;
