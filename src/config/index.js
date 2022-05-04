import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
    // This error should crash whole process

    throw new Error("  Couldn't find .env file  ");
}

export default {
    /**
     * Establish the express port
     */
    port: parseInt(process.env.PORT, 10),

    /**
     * The mongo db connection url
     */
    databaseURL: 'mongodb://127.0.0.1:27017/local',

    /**
     * The mongo db database to open
     */
    databaseName: 'local',

    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,

    /**
     * Use by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    /**
     * Agenda configuration
     */
    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
    },

    /**
     *
     */

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
};
