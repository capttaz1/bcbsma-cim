import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    app.use('/hrv', route);

    route.get('/all', async (req, res, next) => {
        const logger = Container.get('logger');
        logger.debug('Calling the HRV service endpoint with body: %o', req.body);

        try {
            const hrvServiceInstance = Container.get('HRVService');
            const hrv = await hrvServiceInstance.read();
            return res.json(hrv);
        } catch (error) {
            logger.error('Error in the HRV router: %o', error);
            return next(error);
        }
    });
};
