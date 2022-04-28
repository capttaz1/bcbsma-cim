import { Container, Service } from 'typedi';
import * as brain from 'brain.js';
import HealthIndexService from './healthindex';

export default class ForecastService {
    // get a forecast
    async read(steps, water, bmi, hrv) {
        const logger = Container.get('logger');

        try {
            const healthIndexInstance = new HealthIndexService();
            const healthIndexes = await healthIndexInstance.read();

            let data = this.createTrainingData(healthIndexes);

            let prediction = this.predict(data, steps, water, bmi, hrv);

            return prediction;
        } catch (e) {
            logger.error('Error in the StepService read method %o: ', e);
            throw e;
        }
    }

    createTrainingData(data) {
        const logger = Container.get('logger');
        let training = [];
        data.forEach(element => {
            if (element.index == 1) {
                let e = {
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
                let e = {
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

    predict(data, steps, water, bmi, hrv) {
        const logger = Container.get('logger');

        try {
            const net = new brain.NeuralNetwork();

            net.train(data);

            const output = net.run({ steps: steps, water: water, bmi: bmi, hrv: hrv });

            return output;
        } catch (error) {
            logger.error('Error creating a Health Index prediction: %o', error);
            throw error;
        }
    }
}
