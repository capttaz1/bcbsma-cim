import { Container } from 'typedi';
import * as dfd from 'danfojs-node';
import moment from 'moment';

export default class HRVService {
    // get all steps
    async read() {
        const logger = Container.get('logger');

        try {
            const hrvModel = Container.get('hrvModel');
            const hrv = await hrvModel.find();

            let data = JSON.parse(JSON.stringify(hrv));
            let s = await this.createDataFrame(data);
            return s;
        } catch (e) {
            logger.error('Error in the HRV Service read method %o: ', e);
            throw e;
        }
    }

    async createDataFrame(data) {
        const logger = Container.get('logger');

        try {
            let s = new dfd.DataFrame(data);
            s.drop({ columns: ['_id', '__v'], inplace: true });

            let df_new = s.applyMap(this.cleanDataFrame);
            let df_group = df_new.groupby(['date']).mean();
            df_group.rename({ value_mean: 'value' }, { inplace: true });
            let f = dfd.toJSON(df_group);
            return f;
        } catch (e) {
            logger.error('Error creating a HRV DataFrame: %o', e);
            throw e;
        }
    }

    cleanDataFrame(data) {
        const date = moment(data, 'YYYY-MM-DDTHH:mm:ss.000Z', true);

        if (date.isValid()) {
            return date.format('MM-DD-YYYY');
        } else {
            return data;
        }
    }
}
