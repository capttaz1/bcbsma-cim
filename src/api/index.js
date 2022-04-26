import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import step from './routes/steps';
import hrv from './routes/hrv';
import mix from './routes/mix';

export default () => {
    const app = Router();
    auth(app);
    user(app);
    step(app);
    hrv(app);
    mix(app);

    return app;
};
