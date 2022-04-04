import express from "express";
import hrvController from "./hrv.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import auth from "../../middleware/auth.middleware";

const hrvRoutes = express.Router();

hrvRoutes.get("/", (req, res, next) => {
  res.json({ message: "hello world" });
});

// Load
hrvRoutes.post("/hrv", asyncWrapper(hrvController.load));

//Get All Steps
hrvRoutes.get("/hrv", asyncWrapper(hrvController.findAll));

export { hrvRoutes };
