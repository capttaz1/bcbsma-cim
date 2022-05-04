import { MongoClient } from 'mongodb';
import config from '@/config';
import Container from 'typedi';

export default async () => {
    const uri = config.databaseURL;

    const client = new MongoClient(uri);

    Container.set('client', client);

    return client;
};
