import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    app.use('/forecast', route);

    route.get('/all', async (req, res, next) => {
        const logger = Container.get('logger');
        const forecastInstanceService = Container.get('ForecastService');

        logger.debug('Calling the Forecast service endpoint with body: %o', req.body);

        const steps = req.query.steps || 0;
        const water = req.query.water || 0;
        const bmi = req.query.bmi || 0;
        const hrv = req.query.hrv || 0;

        try {
            const prediction = await forecastInstanceService.read(steps, water, bmi, hrv);
            return res.json(prediction);
        } catch (error) {
            logger.error('Error in the Forecast router: %o', error);
            return next(error);
        }
    });
};
