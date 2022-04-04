import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StepModel } from "./step.model";
import httpStatus from "../../utils/httpStatus";
import appConfig from "../../config/env";
import csvtojson from "csvtojson";
import * as dfd from "danfojs-node";
import dateHandler from "../../utils/datehandler";

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

    let df = new dfd.DataFrame(JSON.parse(JSON.stringify(steps)));
    // remove mongoose columns
    df.drop({ columns: ["_id", "__v"], inplace: true });

    // apply date validation
    let df_new = df.applyMap(dateHandler.simpleDate);

    // group by year and monoth
    let group_df = df_new.groupby(["date"]).sum();

    // index by the date column
    group_df.setIndex({ column: "date", inplace: true });
    let df2 = group_df.sortIndex({ ascending: true });

    // rename the summed column
    df2.rename({ value_sum: "value" }, { inplace: true });

    return res.json(df2.toJSON());
  } catch (error) {
    console.error(error.toString());
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

export default stepController;
