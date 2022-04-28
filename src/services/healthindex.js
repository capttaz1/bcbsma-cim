import { Container } from 'typedi';
import * as dfd from 'danfojs-node';

export default class HealthIndexService {
    // get all health indexes
    async read() {
        const logger = Container.get('logger');

        try {
            const healthIndexModel = Container.get('healthIndexModel');
            const healthIndexes = await healthIndexModel.find();

            let data = JSON.parse(JSON.stringify(healthIndexes));
            let s = await this.createDataFrame(data);
            return s;
        } catch (e) {
            logger.error('Error in the Health Index Service read method %o: ', e);
            throw e;
        }
    }

    async createDataFrame(data) {
        const logger = Container.get('logger');

        try {
            let s = new dfd.DataFrame(data);
            s.drop({ columns: ['_id'], inplace: true });

            let f = dfd.toJSON(s);
            return f;
        } catch (e) {
            logger.error('Error creating a Health Index DataFrame: %o', e);
            throw e;
        }
    }
}
