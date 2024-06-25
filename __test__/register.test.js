/* eslint-disable no-undef */
const request = require('supertest');

const host = 'http://127.0.0.1:3000/api/v1'

describe('Test the register route', () => {
    test('It should respond with a 201 status code for successful registration', async () => {
        const response = await request(host)
            .post('/register')
            .send({
                name: 'ujang',
                email: 'ujang@gmail.com',
                password: '123456',
            });
        expect(response.statusCode).toBe(422);
    });

    test('It should respond with a 422 status code for Validation error', async () => {
        const response = await request(host)
            .post('/register')
            .send({
                name: '',
                email: '',
                password: '',
            });
        expect(response.statusCode).toBe(422);
    });
});