import { Container } from 'typedi';
import * as brain from 'brain.js';

/**
 * Service endpoint for hrv data
 */
export default class ForecastService {
    /**
     * Forecast Service constructor method
     * @constructor
     */
    constructor() {
        this.logger = Container.get('logger');
        this.healthIndexInstance = Container.get('HealthIndexService');
    }

    /**
     * Service CRUD method - returns forecast data for health indexes
     *
     * @param {number} steps - 1 if achieved the daily goal, 0 if not
     * @param {number} water - 1 if achieved the daily goal, 0 if not
     * @param {number} bmi - 1 if within the correct BMI, 0 if not
     * @param {number} hrv - 1 if achieved the daily goal, 0 if not
     * @return {string} - JSON representation of the forecast
     */
    async read(steps, water, bmi, hrv) {
        try {
            const healthIndexes = await this.healthIndexInstance.read();

            const data = this.createTrainingData(healthIndexes);

            const prediction = this.predict(data, steps, water, bmi, hrv);

            return prediction;
        } catch (e) {
            this.logger.error('Error in the StepService read method %o: ', e);
            throw e;
        }
    }

    /**
     * Creates an array of data for input into a model for training
     *
     * @param {string} data - A MongoDB collection of Health Index data
     * @return {array} training - an array of model data
     */
    createTrainingData(data) {
        const training = [];
        data.forEach(element => {
            if (element.index == 1) {
                const e = {
                    input: {
                        steps: element.steps,
                        water: element.water,
                        bmi: element.bmi,
                        hrv: element.hrv,
                    },
                    output: { success: 1 },
                };
                training.push(e);
            } else {
                const e = {
                    input: {
                        steps: element.steps,
                        water: element.water,
                        bmi: element.bmi,
                        hrv: element.hrv,
                    },
                    output: { fail: 1 },
                };
                training.push(e);
            }
        });
        return training;
    }

    /**
     * Trains and predicts an outcome based on Health Index data
     *
     * @param {number} data - Model data
     * @param {number} steps - Steps indicator for prediction
     * @param {number} water - Water indicator for prediction
     * @param {number} bmi - BMI indicator for prediction
     * @param {number} hrv - HRV indicator for prediction
     * @return {string} output - JSON representation of the prediction
     */
    predict(data, steps, water, bmi, hrv) {
        try {
            const net = new brain.NeuralNetwork();

            net.train(data);

            const output = net.run({ steps: steps, water: water, bmi: bmi, hrv: hrv });

            return output;
        } catch (error) {
            this.logger.error('Error creating a Health Index prediction: %o', error);
            throw error;
        }
    }
}
