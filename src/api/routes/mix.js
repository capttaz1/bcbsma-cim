import { Router } from 'express';
import { Container } from 'typedi';
import StepService from '../../services/steps';
import HRVService from '../../services/hrv';
import * as dfd from 'danfojs-node';

const route = Router();

export default app => {
    app.use('/mix', route);

    route.get('/all', async (req, res, next) => {
        const logger = Container.get('logger');
        logger.debug('Calling the Step service endpoint with body: %o', req.body);

        try {
            const stepServiceInstance = new StepService();
            const steps = await stepServiceInstance.read();

            const hrvServiceInstance = new HRVService();
            const hrv = await hrvServiceInstance.read();

            // TODO: move this to it's own service or implement a controller model as well
            let df = createDataFrame(steps, hrv);
            return res.json(df);
        } catch (e) {
            logger.error('Error in the Step router: %o', error);
            return next(error);
        }
    });

    function createDataFrame(steps, hrv) {
        const logger = Container.get('logger');

        try {
            let step_data = JSON.parse(JSON.stringify(steps));
            let hrv_data = JSON.parse(JSON.stringify(hrv));

            let df_steps = new dfd.DataFrame(step_data);
            let df_hrv = new dfd.DataFrame(hrv_data);

            let df_merge = dfd.merge({ left: df_steps, right: df_hrv, on: ['date'], how: 'inner' });
            df_merge.rename({ value: 'steps', value_1: 'hrv' }, { inplace: true });
            let df_tail = df_merge.tail(25);
            let df = dfd.toJSON(df_tail);
            return df;
        } catch (e) {
            logger.error('Error creating a Data Frame in the mix route: %o', e);
            throw e;
        }
    }
};
