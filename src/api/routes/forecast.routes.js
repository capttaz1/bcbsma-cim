import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    app.use('/forecast', route);

    route.get('/all', async (req, res, next) => {
        const logger = Container.get('logger');
        const forecastInstanceService = Container.get('ForecastService');

        logger.debug('Calling the Forecast service endpoint with body: %o', req.body);

        let steps = req.query.steps || 0;
        let water = req.query.water || 0;
        let bmi = req.query.bmi || 0;
        let hrv = req.query.hrv || 0;

        try {
            let prediction = await forecastInstanceService.read(steps, water, bmi, hrv);
            return res.json(prediction);
        } catch (error) {
            logger.error('Error in the Forecast router: %o', error);
            return next(error);
        }
    });
};
