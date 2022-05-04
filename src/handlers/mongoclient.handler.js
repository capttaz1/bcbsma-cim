import { MongoClient } from 'mongodb';
import Container from 'typedi';
import config from '@/config';

/**
 * Will create a mongo client for use as a centralized class
 */
export default class MongoClientHandler {
    /**
     * Mongo Client Handler constructor method
     *
     * @constructor
     */
    constructor() {
        this.logger = Container.get('logger');
        const uri = config.databaseURL;
        this.client = new MongoClient(uri);
    }

    /**
     * Creates an open connection to Mongo Db
     *
     * @return {Db} database - Returns a new Db instance of a Mongo Connection
     */
    async open() {
        try {
            this.logger.info('Opening Mongo connection');

            await this.client.connect();
            const database = this.client.db();
            return database;
        } catch (error) {
            this.logger.error('An error occurred opening a Mongo connection: %o', error);
            throw error;
        }
    }

    /**
     * Returns the collection requested
     *
     * @param {string} collection - The collection name
     * @return {array} collection - A collection of database objects
     */
    async getCollection(collection) {
        try {
            const database = this.client.db();
            return database.collection(collection);
        } catch (error) {
            this.logger.error('An error occurred retrieving a collection: %o', error);
            throw error;
        }
    }

    /**
     * Closes an open connection to Mongo Db
     */
    async close() {
        try {
            await this.client.close();
        } catch (error) {
            this.logger.error('An error occurred closing the Mongo connection: %o', error);
        }
    }
}
