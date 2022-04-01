import express from "express";
import stepController from "./step.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import auth from "../../middleware/auth.middleware";

const stepRoutes = express.Router();

stepRoutes.get("/", (req, res, next) => {
  res.json({ message: "hello world" });
});

// Load
stepRoutes.post("/steps", asyncWrapper(stepController.load));

//Get All Steps
stepRoutes.get("/steps", asyncWrapper(stepController.findAll));

export { stepRoutes };
