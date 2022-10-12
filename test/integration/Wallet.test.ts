// import supertest from 'supertest';
// import {assert} from 'chai';
// import { faker } from '@faker-js/faker';
// import { credentials, getLoginData, LoginType, request } from '..';
// import WalletRepo, { Wallet } from '../../src/database/repositories/WalletRepo';

// export const userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';


// let user1: LoginType;
// let user2: LoginType;
// let token: string;
// let wallet1: Wallet
// let wallet2: Wallet

// const newCredentials = {
//     email: faker.internet.email(),
//     password: faker.internet.password(),
// }

// before(async () => {
//     //USER1 config
//     user1 = await getLoginData(newCredentials.email, newCredentials.password);
//     console.log('USER1', user1);
    
//     token = user1.token;

//     wallet1 = await WalletRepo.create({
//         userId: user1.id
//     }) as Wallet

//     //Add 1000 to wallet balance of user1
//     await WalletRepo.updateBalance(wallet1, 1000);

//     //USER2 config
//     user2 = await getLoginData(credentials.email, credentials.password);

//     wallet2 = await WalletRepo.getWalletByUser(user2) as Wallet;
// })

// describe('Wallet', () => {

//     it("should transfer from a user's wallet to another wallet", async () => {
//         const res = await request
//         .post('/wallet/transfer')
//         .set("User-Agent", userAgent)
//         .set('authorization', `Bearer ${token}`)
//         .send({
//             walletId: wallet2.id,
//             amount: 500
//         })

//         assert.equal(res.status, 200);
//         assert.include(res.body.message, 'transfer successful')
//     })
// })