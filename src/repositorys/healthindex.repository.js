import { Container } from 'typedi';
import MongoClientHandler from '../handlers/mongoclient.handler';

/**
 * Health Index Repository
 */
export default class HealthIndexRepository {
    /**
     * Health Index Repository constructor
     *
     * @constructor
     */
    constructor() {
        this.logger = Container.get('logger');
        this.client = new MongoClientHandler();
    }

    /**
     * Repository CRUD method - Reads all data from the data source
     *
     * @return {array} data - Returns an array of data model objects
     */
    async read() {
        try {
            this.logger.info('Health Index repository read method called');

            const database = await this.client.open();
            const healthindexes = database.collection('healthindexes');

            const cursor = await healthindexes.find();

            if ((await cursor.count()) === 0) {
                this.logger.info('No documents found');
            }

            const data = [];
            await cursor.forEach(element => {
                data.push(element);
            });

            return data;
        } catch (error) {
            this.logger.error('An error occurred retrieving Health Index data: %o: ', error);
            throw error;
        } finally {
            await this.client.close();
        }
    }
}
