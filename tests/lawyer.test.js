const request = require('supertest');
const app = require('../src/server');

describe('Lawyer API Tests', () => {
    it('should return a list of lawyers', async () => {
        const res = await request(app).get('/api/lawyers');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
