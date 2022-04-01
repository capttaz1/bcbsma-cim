import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StepModel } from "./step.model";
import httpStatus from "../../utils/httpStatus";
import appConfig from "../../config/env";
import csvtojson from "csvtojson";

const stepController = {};

// Load Step Data
stepController.load = async (req, res, next) => {
  try {
    // CSV File Name
    const FILE_NAME = "StepCount.csv";

    let arrayToInsert = [];
    csvtojson()
      .fromFile(FILE_NAME)
      .then((source) => {
        for (var i = 0; i < source.length; i++) {
          const step = new StepModel();
          step.date = source[i]["startDate"];
          step.value = source[i]["value"];
          step.save();
        }
        console.log("Import CSV into MongoDB successful");
        return res
          .status(httpStatus.CREATED)
          .json("Import CSV into MongoDB successful");
      });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Get All Steps
stepController.findAll = async (req, res) => {
  try {
    let steps = await StepModel.find();
    return res.json(steps);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

export default stepController;
