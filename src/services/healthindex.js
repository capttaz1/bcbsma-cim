import { Container } from 'typedi';
import * as dfd from 'danfojs-node';

/**
 * Service endpoint for Health Index data
 */
export default class HealthIndexService {
    /**
     * HRV Service constructor method
     * @constructor
     */
    constructor() {
        this.logger = Container.get('logger');
        this.repository = Container.get('HealthIndexRepository');
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
     * @return {string} - JSON representation of health index data
     */
    async read() {
        try {
            const data = await this.repository.read();

            const arrData = JSON.parse(JSON.stringify(data));

            const jsonData = await this.createDataFrame(arrData);

            return jsonData;
        } catch (error) {
            this.logger.error('Error in the Health Index Service read method %o: ', error);
            throw error;
        }
    }

    /**
     * Creates a DataFrame for data manipulation and cleanup
     * @param {array} data - Array of health index model objects
     * @return {string} - Returns a string representation of JSON formatted data
     */
    async createDataFrame(data) {
        try {
            const df = new dfd.DataFrame(data);

            df.drop({ columns: ['_id'], inplace: true });

            return dfd.toJSON(df);
        } catch (error) {
            this.logger.error('Error creating a Health Index DataFrame: %o', error);
            throw error;
        }
    }
}
