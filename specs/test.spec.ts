import * as supertest from 'supertest';
const request = supertest('https://gorest.co.in');

describe('Test assignment Stacy', () => {
    it('GET /public/v2/users', async () => {
        const res = await request.get('/public/v2/users');
        console.log(res);
    })
})