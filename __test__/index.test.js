const request = require('supertest');

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request('http://127.0.0.1:3000').get('/');
        expect(response.statusCode).toBe(200);
    });
});