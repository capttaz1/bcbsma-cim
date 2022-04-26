import expressLoader from './express';
import dependencyInjector from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

export default async expressApp => {
    const mongoConnection = await mongooseLoader();
    Logger.info('DB Loaded and connected');

    /**
     * Inject Models
     */
    const stepModel = { name: 'stepModel', model: require('../models/step.model').default };
    const hrvModel = { name: 'hrvModel', model: require('../models/hrv.model').default };

    const agenda = await dependencyInjector({
        mongoConnection,
        models: [
            stepModel,
            hrvModel,
            // additional models
        ],
    });

    Logger.info('Dependency Injector loaded');

    await expressLoader(expressApp);
    Logger.info('Express loaded');
};
