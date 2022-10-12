import supertest from 'supertest';
import app from '../src';
import { faker } from '@faker-js/faker';


export const userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';

export const request = supertest.agent(app);

// export const credentials = {
//     email: faker.internet.email(),
//     password: faker.internet.password(),
// }

export type LoginType = {
    id: number;
    email: string;
    password: string;
    token: string;
};

export const getLoginData = async (email: string, password: string, referralCode?: string) => {
    const res = await request
        .post('/auth/register') //
        .set('User-Agent', userAgent)
        .send({ email, password });        

    let response;
    if (res.body.data) {
        response = await request
            .post('/auth/login')
            .set('User-Agent', userAgent)
            .send({email, password});
            
    } else {
        console.log(res.error);
    }

    return response?.body.data as LoginType;
};