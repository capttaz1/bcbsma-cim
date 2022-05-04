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
            const df = createDataFrame(steps, hrv);
            return res.json(df);
        } catch (e) {
            logger.error('Error in the Step router: %o', error);
            return next(error);
        }
    });

    /**
     * Creates a DataFrame
     *
     * @param {array} steps
     * @param {array} hrv
     * @return {object} df - A single merged DataFrame
     */
    function createDataFrame(steps, hrv) {
        const logger = Container.get('logger');

        try {
            const stepData = JSON.parse(JSON.stringify(steps));
            const hrvData = JSON.parse(JSON.stringify(hrv));

            const dfSteps = new dfd.DataFrame(stepData);
            const dfHrv = new dfd.DataFrame(hrvData);

            const dfMerge = dfd.merge({ left: dfSteps, right: dfHrv, on: ['date'], how: 'inner' });
            dfMerge.rename({ value: 'steps', value_1: 'hrv' }, { inplace: true });
            const dfTail = dfMerge.tail(25);
            const df = dfd.toJSON(dfTail);
            return df;
        } catch (e) {
            logger.error('Error creating a Data Frame in the mix route: %o', e);
            throw e;
        }
    }
};
