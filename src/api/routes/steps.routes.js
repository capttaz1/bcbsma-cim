import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    app.use('/steps', route);

    route.get('/', async (req, res, next) => {
        const logger = Container.get('logger');
        logger.debug('Calling the Step service endpoint with body: %o', req.body);

        try {
            const stepServiceInstance = Container.get('StepService');
            const steps = await stepServiceInstance.read();
            return res.json(steps);
        } catch (error) {
            logger.error('Error in the Step router: %o', error);
            return next(error);
        }
    });
};
