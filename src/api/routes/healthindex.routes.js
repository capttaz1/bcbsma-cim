import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    app.use('/healthindex', route);

    route.get('/all', async (req, res, next) => {
        const logger = Container.get('logger');
        logger.debug('Calling the Health Index service endpoint with body: %o', req.body);

        try {
            const healthIndexServiceInstance = Container.get('HealthIndexService');
            const healthIndex = await healthIndexServiceInstance.read();
            return res.json(healthIndex);
        } catch (error) {
            logger.error('Error in the Health Index router: %o', error);
            return next(error);
        }
    });
};
