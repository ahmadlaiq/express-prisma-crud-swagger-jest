/* eslint-disable no-undef */
const request = require('supertest');

const host = 'http://127.0.0.1:3000/api/v1'

describe('Test the login route', () => {
    test('It should respond with a 200 status code for successful login', async () => {
        const response = await request(host)
            .post('/login')
            .send({
                email: 'admin@gmail.com',
                password: '123456'
            });
        expect(response.statusCode).toBe(200);
    });

    test('It should respond with a 401 status code for invalid credentials', async () => {
        const response = await request(host)
            .post('/login')
            .send({
                email: 'admin@gmail.com',
                password: '1234567'
            });
        expect(response.statusCode).toBe(401);
    });

    test('It should respond with a 404 status code for User not found', async () => {
        const response = await request(host)
            .post('/login')
            .send({
                email: 'adminsalah@gmail.com',
                password: '1234567'
            });
        expect(response.statusCode).toBe(404);
    });

    test('It should respond with a 401 status code for Validation error', async () => {
        const response = await request(host)
            .post('/login')
            .send({
                email: '',
                password: ''
            });
        expect(response.statusCode).toBe(422);
    });

});