import { Router } from 'express';
import step from './routes/steps.routes';
import hrv from './routes/hrv.routes';
import healthindex from './routes/healthindex.routes';
import forecast from './routes/forecast.routes';
import mix from './routes/mix.routes';

export default () => {
    const app = Router();
    step(app);
    hrv(app);
    mix(app);
    healthindex(app);
    forecast(app);

    return app;
};
