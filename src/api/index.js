import { Router } from 'express';
import auth from './routes/auth.routes';
import user from './routes/user.routes';
import step from './routes/steps.routes';
import hrv from './routes/hrv.routes';
import mix from './routes/mix.routes';
import healthindex from './routes/healthindex.routes';
import forecast from './routes/forecast.routes';

export default () => {
    const app = Router();
    auth(app);
    user(app);
    step(app);
    hrv(app);
    mix(app);
    healthindex(app);
    forecast(app);

    return app;
};
