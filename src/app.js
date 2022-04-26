import 'reflect-metadata';
import 'module-alias/register';
import 'dotenv/config';

import express from 'express';
import config from './config';
import Logger from './loaders/logger';

async function startServer() {
    const app = express();

    await require('./loaders').default(app);

    app.listen(config.port, () => {
        Logger.info(`
            ##################################################
                Server listening on port: ${config.port}
            ##################################################
        `);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });
}

startServer();
