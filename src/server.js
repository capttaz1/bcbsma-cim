import app from './app';
import config from './config';
import Logger from './loaders/logger';

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
