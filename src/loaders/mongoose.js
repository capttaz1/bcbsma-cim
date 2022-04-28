import mongoose from 'mongoose';
import config from '@/config';

export default async () => {
    await mongoose
        .connect(config.databaseURL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(db => {
            console.log(`Connected to MongoDb, DB name: "${db.connections[0].name}"`);
            return db;
        })
        .catch(error => {
            console.error('Error connecting to mongo', error);
        });

    return mongoose;
};
