import expressLoader from './express';
import dependencyInjector from './dependencyInjector';
import Logger from './logger';

export default async expressApp => {
    const mongoConnection = {};
    /**
     * Inject Repositorys in the Container
     */
    const stepRepository = { name: 'StepRepository', repository: require('../repositorys/steps.repository').default };
    const hrvRepository = { name: 'HRVRepository', repository: require('../repositorys/hrv.repository').default };
    const healthIndexRepository = {
        name: 'HealthIndexRepository',
        repository: require('../repositorys/healthindex.repository').default,
    };

    /**
     * Inject Services in the Container
     */
    const forecastService = { name: 'ForecastService', service: require('../services/forecast').default };
    const healthIndexService = { name: 'HealthIndexService', service: require('../services/healthindex').default };
    const stepService = { name: 'StepService', service: require('../services/steps').default };
    const hrvService = { name: 'HRVService', service: require('../services/hrv').default };

    await dependencyInjector({
        mongoConnection,
        models: [
            stepRepository,
            hrvRepository,
            healthIndexRepository,
            // additional models
        ],
        services: [forecastService, healthIndexService, stepService, hrvService],
    });

    Logger.info('Dependency Injector loaded');

    await expressLoader(expressApp);
    Logger.info('Express loaded');
};
