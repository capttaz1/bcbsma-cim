import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HRVModel } from "../hrv/hrv.model";
import { StepModel } from "../steps/step.model";
import httpStatus from "../../utils/httpStatus";
import appConfig from "../../config/env";
import csvtojson from "csvtojson";
import * as dfd from "danfojs-node";
import moment from "moment";

const chartController = {};

// validate column is a date column
function isValidDate(x) {
  var d = moment(x, "YYYY-MM-DDTHH:mm:ss.000Z", true);
  if (d == null || !d.isValid()) return false;

  return true;
}

// cleanup date
function simpleDate(x) {
  if (isValidDate(x)) {
    return moment(x).format("YYYY-MM");
  } else {
    return x;
  }
}

// Get All HRV
chartController.findAll = async (req, res) => {
  try {
    let hrvs = await HRVModel.find();
    let steps = await StepModel.find();

    let df = new dfd.DataFrame(JSON.parse(JSON.stringify(hrvs)));
    let df2 = new dfd.DataFrame(JSON.parse(JSON.stringify(steps)));

    // remove mongoose columns
    df.drop({ columns: ["_id", "__v"], inplace: true });
    df2.drop({ columns: ["_id", "__v"], inplace: true });

    // apply date validation
    let df_new = df.applyMap(simpleDate);
    let df2_new = df2.applyMap(simpleDate);

    // group by year and monoth
    let group_df = df_new.groupby(["date"]).mean();
    let group_df2 = df2_new.groupby(["date"]).sum();

    // rename the summed column
    group_df.rename({ value_mean: "hrv" }, { inplace: true });
    group_df2.rename({ value_sum: "steps" }, { inplace: true });

    let merge_df = dfd.merge({
      left: group_df,
      right: group_df2,
      on: ["date"],
      how: "inner",
    });

    return res.json(merge_df.toJSON());
  } catch (error) {
    console.error(error.toString());
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

export default chartController;
