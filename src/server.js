import 'reflect-metadata'; // We need this for decorators ... but ...
import 'regenerator-runtime/runtime';
import 'module-alias/register';
import 'dotenv/config';

import express from 'express';

const app = express();
/**
 * Loads express and dependency injected items
 */
async function startServer() {
    await require('./loaders').default(app);
}

startServer();

export default app;
