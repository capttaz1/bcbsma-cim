import { Container } from 'typedi';
import MongoClientHandler from '../handlers/mongoclient.handler';

/**
 * Step Repository for communicating with the DB source
 */
export default class StepRepository {
    /**
     * Step Repository constructor
     *
     * @constructor
     */
    constructor() {
        this.logger = Container.get('logger');
        this.client = new MongoClientHandler();
    }

    /**
     * Repository CRUD method - reads all or filtered data from the data source
     *
     * @param {string} date - A string representation of a date, in local date format ('MM-DD-YYYY')
     * @return {array} data - Returns an array of data model objects
     */
    async read(date) {
        try {
            this.logger.info('Step repository read method called with date: %o', date);

            await this.client.open();
            const steps = await this.client.getCollection('steps');

            const cursor = {};
            if (date && date.length > 0) {
                cursor = await steps.find({
                    date: { $gte: new Date(date) },
                });
            } else {
                cursor = await steps.find();
            }

            const data = [];
            if ((await cursor.count()) === 0) {
                this.logger.info('No documents found');
                return data;
            }

            await cursor.forEach(element => {
                data.push(element);
            });

            return data;
        } catch (error) {
            this.logger.error('An error occurred retrieving step data: %o', error);
            throw error;
        } finally {
            await this.client.close();
        }
    }
}
