import { Container } from 'typedi';
import LoggerInstance from './logger';

export default ({ mongoConnection, models, services }) => {
    try {
        /**
         * Add the models to the container
         */
        models.forEach(m => {
            Container.set({ id: m.name, type: m.repository });
        });

        /**
         * Add the services to the container
         */
        services.forEach(s => {
            Container.set({ id: s.name, type: s.service });
        });

        // const agendaInstance = agendaFactory({ mongoConnection });

        // Container.set('agendaInstance', agendaInstance);
        Container.set('logger', LoggerInstance);

        LoggerInstance.info('Agenda injected into container');

        // return agendaInstance;
    } catch (e) {
        LoggerInstance.error('Error on dependency injector loader: %o', e);
        throw e;
    }
};
