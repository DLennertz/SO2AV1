import express from "express";
import {
  getBrand,
  getBrands,
  createBrand,
  deleteBrand,
  updateBrand
} from "../controller/brand.controller.js";

const brandRoutes = express.Router();

brandRoutes.route("/").get(getBrands).post(createBrand);

brandRoutes.route("/:id").get(getBrand).put(updateBrand).delete(deleteBrand);

export default brandRoutes;
