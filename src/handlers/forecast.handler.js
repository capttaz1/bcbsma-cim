import * as brain from 'brain.js';
import * as fs from 'fs';
import Container from 'typedi';

/**
 * Will manage all forecasts for brain.js models and predictions
 */
export default class ForecastHandler {
    /**
     * Forecast Handler constructor
     *
     * @constructor
     */
    constructor() {
        this.logger = Container.get('logger');
        this.network = new brain.recurrent.LSTM();
        this.model = {};
    }

    /**
     *
     * @param {array} data - An array of data for building training sets
     * @return {array} trainingData - An array of JSON objects
     */
    buildStepsTrainingSet(data) {
        const trainingData = data.map(e => {
            return { input: e[0], output: e[1].toString() };
        });

        return trainingData;
    }

    /**
     * Builds or retrieves the training model
     *
     * @param {*} data - If no model exists one is built
     */
    trainExpenseCategoryMl(data) {
        const logger = Container.get('logger');
        try {
            model = JSON.parse(fs.readFileSync('./_ml/trained-steps.json', 'utf8'));
            logger.info(model);
        } catch (err) {
            const trainingData = buildStepsTrainingSet(data);

            network.train(trainingData, { log: true, errorThresh: 0.03 });

            const json = network.toJSON();
            const jsonStr = JSON.stringify(json);

            fs.writeFileSync(`_ml/trained-steps.json`, jsonStr, 'utf8');
        }
    }

    /**
     * Runs a brain.js model prediction
     *
     * @param {object} data - Object data to run through the model
     * @return {object} results - A JSON object with run results
     */
    run(data) {
        const model = JSON.parse(fs.readFileSync('./_ml/trained-steps.json', 'utf8'));
        network.fromJSON(model);
        return network.run(data);
    }
}
