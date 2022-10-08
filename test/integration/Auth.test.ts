import supertest from 'supertest';
import {assert} from 'chai';
import { faker } from '@faker-js/faker';
import express from 'express';

const app = express();
const request = supertest.agent(app);

describe(('Register'), () => {
    it('Registers a new user', async () => {
        const res = await request
        .post('auth/register')
        .send({
            email: faker.internet.email(),
            password: faker.internet.password(6)
        })
        console.log("RES ERROR",res.error);
        
        assert.equal(res.status, 200);
    })
})