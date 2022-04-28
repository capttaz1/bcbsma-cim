import expressLoader from './express';
import dependencyInjector from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

export default async expressApp => {
    const mongoConnection = await mongooseLoader();
    Logger.info('DB Loaded and connected');

    /**
     * Inject Models in the Container
     */
    const stepModel = { name: 'stepModel', model: require('../models/step.model').default };
    const hrvModel = { name: 'hrvModel', model: require('../models/hrv.model').default };
    const healthIndexModel = { name: 'healthIndexModel', model: require('../models/healthindex.model').default };

    /**
     * Inject Services in the Container
     */
    const forecastService = { name: 'ForecastService', service: require('../services/forecast').default };
    const healthIndexService = { name: 'HealthIndexService', service: require('../services/healthindex').default };

    const agenda = await dependencyInjector({
        mongoConnection,
        models: [
            stepModel,
            hrvModel,
            healthIndexModel,
            // additional models
        ],
        services: [forecastService, healthIndexService],
    });

    Logger.info('Dependency Injector loaded');

    await expressLoader(expressApp);
    Logger.info('Express loaded');
};
