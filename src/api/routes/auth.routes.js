import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default app => {
    app.use('/auth', route);

    route.post(
        '/register',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req, res, next) => {
            const logger = Container.get('logger');
            logger.debug('Calling Register endpoint with body: %o', req.body);

            try {
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.register(req.body);
                return res.status(201).json({ user, token });
            } catch (err) {
                logger.error('error: %o', err);
                return next(err);
            }
        },
    );

    route.post(
        '/login',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req, res, next) => {
            const logger = Container.get('logger');
            logger.debug('Calling login endpoint with body: %o', req.body);

            try {
                const { email, password } = req.body;
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.login(email, password);
                return res.json({ user, token }).status(200);
            } catch (err) {
                logger.error('error: %o', err);
                return next(err);
            }
        },
    );
};
