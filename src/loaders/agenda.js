import { Agenda } from 'agenda/es';
import config from '@/config';

export default mongoConnection => {
    return new Agenda({
        mongo: mongoConnection.connection,
        db: { collection: config.agenda.dbCollection },
        processEvery: config.agenda.pooltime,
        maxConcurrency: config.agenda.concurrency,
    });
};
