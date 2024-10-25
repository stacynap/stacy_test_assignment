//import * as supertest from 'supertest';
import config from '../config/base.config'
const request = require('supertest');
//const request = supertest('https://gorest.co.in/');

describe('Tests', () => {
  let userId;
  describe('Read all users request', () => {
    it('GET List of all users', async () => {
      const res = await request(config.url)
        .get('/public/v2/users')
        .set("Authorization", "Bearer " + config.token)
      expect(res.statusCode).toBe(200)
    })
  });

  describe('Create & Read user requests', () => {
    it('POST Create a user', async () => {
      const data = {
        name: 'Stacy Test',
        gender: 'female',
        email: Math.floor(Math.random() * 100) + '@test.stacy',
        status: 'active'
      }

      const res = await request(config.url)
        .post('/public/v2/users')
        .send(data)
        .set("Authorization", "Bearer " + config.token)
      expect(res.body.name).toBe(data.name);
      expect(res.statusCode).toBe(201)

      userId = res.body.id;
    })
    it('GET Single user details', async () => {
      const res = await request(config.url)
        .get('/public/v2/users/' + userId._id)
        .set("Authorization", "Bearer " + config.token)
      expect(res.body.id).toBe(userId.id)
    });
  });

  describe('Update user request', () => {
    it('PUT Update user', async () => {
      const data = {
        name: userId.name + ' Edited',
        gender: 'male',
        email: Math.floor(Math.random() * 100) + '@test.stacy',
        status: 'active'
      }

      const getRes = await request(config.url).get('/public/v2/users/' + userId);
      const beforeName = getRes.body.name;
      const beforeGender = getRes.body.gender;

      const res = await request(config.url)
        .put('/public/v2/users/' + userId)
        .send(data)
        .set("Authorization", "Bearer " + config.token)
      console.log(res.body);
      expect(res.body.name).not.toBe(beforeName); // null
      expect(res.body.name).toBe(data.name);
      expect(res.body.gender).not.toBe(beforeGender); // null
      expect(res.body.gender).toBe(data.gender);
      expect(res.statusCode).toBe(200)
    });
  });

describe('Delete user request', () => {
  it('DELETE User', async () => {
    const res = await request(config.url)
      .delete('/public/v2/users/' + userId)
      .set("Authorization", "Bearer " + config.token)
    console.log(res.body);
    expect(res.statusCode).toBe(204)
    expect(res.body).toEqual({})
  })
  });
})
