import * as brain from "brain.js";
import * as fs from "fs";

const forecastHandler = {};
const network = new brain.recurrent.LSTM();

function buildStepsTrainingSet(data) {
  const trainingData = data.map((e) => {
    return { input: e[0], output: e[1].toString() };
  });

  return trainingData;
}

forecastHandler.trainExpenseCategoryMl = (data) => {
  let d = {};
  try {
    d = JSON.parse(fs.readFileSync("./_ml/trained-steps.json", "utf8"));
  } catch (err) {
    const trainingData = buildStepsTrainingSet(data);

    network.train(trainingData, { log: true, errorThresh: 0.03 });

    const json = network.toJSON();
    const jsonStr = JSON.stringify(json);

    fs.writeFileSync(`_ml/trained-steps.json`, jsonStr, "utf8");
  }
};

forecastHandler.run = (data) => {
  let d = JSON.parse(fs.readFileSync("./_ml/trained-steps.json", "utf8"));
  network.fromJSON(d);
  return network.run(data);
};

export default forecastHandler;
