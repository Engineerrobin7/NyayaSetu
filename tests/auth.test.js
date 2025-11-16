const request = require('supertest');
const app = require('../src/server'); // Import your Express app

describe('Authentication API Tests', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: "Test User", email: "test@example.com", password: "password123" });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should return an error for duplicate email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: "Test User", email: "test@example.com", password: "password123" });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Email already exists");
    });
});
