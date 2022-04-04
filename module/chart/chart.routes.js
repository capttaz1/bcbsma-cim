import express from "express";
import chartController from "./chart.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import auth from "../../middleware/auth.middleware";

const chartRoutes = express.Router();

chartRoutes.get("/", (req, res, next) => {
  res.json({ message: "hello world" });
});

//Get All Chart Data
chartRoutes.get("/chart", asyncWrapper(chartController.findAll));

export { chartRoutes };
