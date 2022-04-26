import { Container } from 'typedi';
import * as dfd from 'danfojs-node';
import moment from 'moment';
import e from 'express';

export default class StepService {
    // get all steps
    async read() {
        const logger = Container.get('logger');

        try {
            const stepModel = Container.get('stepModel');
            const steps = await stepModel.find();

            let data = JSON.parse(JSON.stringify(steps));
            let s = await this.createDataFrame(data);
            return s;
        } catch (e) {
            logger.error('Error in the StepService read method %o: ', e);
            throw e;
        }
    }

    async createDataFrame(data) {
        const logger = Container.get('logger');

        try {
            let s = new dfd.DataFrame(data);
            s.drop({ columns: ['_id', '__v'], inplace: true });

            let df_new = s.applyMap(this.cleanDataFrame);
            let df_group = df_new.groupby(['date']).sum();
            df_group.rename({ value_sum: 'value' }, { inplace: true });
            let f = dfd.toJSON(df_group);
            return f;
        } catch (e) {
            logger.error('Error creating a Step DataFrame: %o', e);
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
