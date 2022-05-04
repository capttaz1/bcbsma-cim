import { Container } from 'typedi';
import * as dfd from 'danfojs-node';
import DateHandler from '../handlers/date.handler';

/**
 * Service endpoint for step data
 */
export default class StepService {
    /**
     * Step Service constructor method
     * @constructor
     */
    constructor() {
        this.logger = Container.get('logger');
        this.repository = Container.get('StepRepository');
        this.dateHandler = new DateHandler();
    }

    /**
     * Service status method
     * @return {string} - "OK"
     */
    async ping() {
        return 'OK';
    }

    /**
     * Service CRUD method - returns all data or data filtered by the input value
     * @return {string} - JSON representation of step data
     */
    async read() {
        try {
            const data = await this.repository.read('2020-11-01');

            const arrData = JSON.parse(JSON.stringify(data));

            const jsonData = await this.createDataFrame(arrData);

            return jsonData;
        } catch (error) {
            this.logger.error('Error in the Step Service read method: %o', error);
            throw error;
        }
    }

    /**
     * Creates a DataFrame for data manipulation and cleanup
     * @param {array} data - Array of step model objects
     * @return {string} - Returns a string representation of JSON formatted data
     */
    async createDataFrame(data) {
        try {
            const df = new dfd.DataFrame(data);

            df.drop({ columns: ['_id', '__v'], inplace: true });

            const dfNew = df.applyMap(this.dateHandler.simpleDate);

            const dfGroup = dfNew.groupby(['date']).sum();

            dfGroup.rename({ value_sum: 'value' }, { inplace: true });

            return dfd.toJSON(dfGroup);
        } catch (error) {
            this.logger.error('Error creating a Step DataFrame: %o', error);
            throw error;
        }
    }
}
