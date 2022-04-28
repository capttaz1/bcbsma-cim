import 'reflect-metadata'; // We need this for decorators ... but ...
import 'module-alias/register';
import 'dotenv/config';

import express from 'express';

const app = express();
async function startServer() {
    await require('./loaders').default(app);
}

startServer();
export default app;
