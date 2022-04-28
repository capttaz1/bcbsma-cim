import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('loading express', () => {
    beforeAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoose.disconnect();
    });

    /**
     * GET status call
     */
    it('GET /status', async () => {
        await request(app).get('/status').expect(200);
    });

    /**
     * GET 404 Handling
     */
    it('GET 404', async () => {
        await request(app).get('/foo').expect(404);
    });

    /**
     * GET steps all
     */
    it('GET /api/steps/all', async () => {
        await request(app).get('/api/steps/all').expect(200);
    });

    /**
     * GET health index all
     */
    it('GET /api/healthindex/all', async () => {
        await request(app).get('/api/healthindex/all').expect(200);
    });

    /**
     * GET hrv all
     */
    it('GET /api/hrv/all', async () => {
        await request(app).get('/api/hrv/all').expect(200);
    });
});
