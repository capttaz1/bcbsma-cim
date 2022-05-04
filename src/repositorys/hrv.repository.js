import { Container } from 'typedi';
import MongoClientHandler from '../handlers/mongoclient.handler';

/**
 * HRV Repository
 */
export default class HRVRepository {
    /**
     * HRV Repository constructor method
     *
     * @constructor
     */
    constructor() {
        this.logger = Container.get('logger');
        this.client = new MongoClientHandler();
    }

    /**
     * Repository CRUD method - Reads all or filtered data from the data source
     *
     * @param {string} date - A string representation of a date, in local date format ('MM-DD_YYY')
     * @return {array} data - Returns an array of data model objects
     */
    async read(date) {
        try {
            this.logger.info('HRV repository read method called with date: %o', date);

            const database = await this.client.open();
            const hrvs = database.collection('hrvs');

            const cursor = await hrvs.find();

            if ((await cursor.count()) === 0) {
                this.logger.info('No documents found');
            }

            const data = [];
            await cursor.forEach(element => {
                data.push(element);
            });

            return data;
        } catch (error) {
            this.logger.error('An error occurred retrieving hrv data: %o', error);
            throw error;
        } finally {
            await this.client.close();
        }
    }
}
