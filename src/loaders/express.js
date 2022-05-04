import express from 'express';
import cors from 'cors';
import routes from '@/api';
import config from '@/config';

export default app => {
    /**
     * Serve static resources
     */
    app.use(express.static('public')); // Serves resources from public folder

    /**
     * Add Health Check endpoints
     *
     */
    app.get('/status', (req, res) => {
        res.status(200).send('OK').end();
    });

    // app.head('/status', (req, res) => {
    //     res.status(200).end();
    // });

    /**
     * For Cloudwatch logs, shows real IP if behind a proxy
     */
    app.enable('trust proxy');

    /**
     * The magic that prevents front end developers for having a meltdown
     */
    app.use(cors());

    /**
     * Transforms the raw string of req.body into json
     */
    app.use(express.json());

    /**
     * Load the api routes
     */
    app.use(config.api.prefix, routes());

    /**
     * TODO: add optic middleware for OpenAPI generation
     */

    /**
     * Catch 404 and forward to the error handler
     */
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /**
     * Error handlers
     */
    app.use((err, res, next) => {
        /**
         * Handle 401 thrown by express-jwt
         */
        if (err.name === 'UnathorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
