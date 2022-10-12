import {assert} from 'chai';
import { faker } from '@faker-js/faker';
import { getLoginData, LoginType, request, userAgent } from '..';
import { Wallet } from '../../src/database/repositories/TransactionsRepo';
import WalletRepo from '../../src/database/repositories/WalletRepo';



let user1: LoginType;
let user2: LoginType;
let token: string;
let wallet1: Wallet
let wallet2: Wallet

const userCredentials1 = {
    email: faker.internet.email(),
    password: faker.internet.password(6)
}
const userCredentials2 = {
    email: faker.internet.email(),
    password: faker.internet.password(6),
}

const authCredentials = {
    email: faker.internet.email(),
    password: faker.internet.password(6)
}

before(async () => {
    //USER1 config
    user1 = await getLoginData(userCredentials1.email, userCredentials1.password);
    
    token = user1.token;

    //Get user1 wallet
    wallet1 = (await WalletRepo.getWalletByUser(user1))!

    //Add 5000 to wallet balance of user1
    const a = await WalletRepo.updateBalance(wallet1, 5000);  
    
    const bal = await WalletRepo.getWalletByUser(user1);    

    //USER2 config
    user2 = await getLoginData(userCredentials2.email, userCredentials2.password);

    wallet2 = (await WalletRepo.getWalletByUser(user2))!;
})


describe('Register', () => {
    it('should register user if all fields are present and correct', async () => {
        const res = await request
        .post('/auth/register')
        .set("User-Agent", userAgent)
        .send(authCredentials)

        assert.equal(res.status, 200);
    })

    it('should return an error if any required fields are absent', async () => {
        const res = await request
        .post('/auth/register')
        .set("User-Agent", userAgent)
        .send({
            password: faker.internet.password(6),
        })        

        assert.equal(res.status, 422);
        assert.include(res.body.message, 'email must be an email');
    })

    it('should return an error if user exists', async () => {
        const res = await request
        .post('/auth/register')
        .set("User-Agent", userAgent)
        .send(authCredentials)

        assert.equal(res.status, 400);
        assert.include(res.body.message, 'User already exists');
    })
})


describe('Login', () => {
    it('should login a user if all fields are present and correct', async () => {
        const res = await request
        .post('/auth/login')
        .set("User-Agent", userAgent)
        .send(authCredentials)

        assert.equal(res.status, 200);
    })

    it('should return an error if any required fields are absent', async () => {
        const res = await request
        .post('/auth/login')
        .set("User-Agent", userAgent)
        .send({
            email: faker.internet.email(),
        })

        assert.equal(res.status, 422);
        assert.include(res.body.message, "password should not be empty")
    })

    it('should return an error if any required fields is incorrect', async () => {
        const res = await request
        .post('/auth/login')
        .set("User-Agent", userAgent)
        .send({
            email: faker.internet.email(),
            password: authCredentials.password
        })

        assert.equal(res.status, 400);
        assert.include(res.body.message, "Email or password is not correct")
    })
})


describe('Wallet', () => {

    it("should transfer from a user's wallet to another wallet", async () => {
        const res = await request
        .post('/wallet/transfer')
        .set("User-Agent", userAgent)
        .set('authorization', `Bearer ${token}`)
        .send({
            walletId: wallet2.id,
            amount: 500
        })
        console.log('WALLET ERR', res.error);
        

        assert.equal(res.status, 200);
        assert.include(res.body.message, 'transfer successful')
    })

    it("should throw error if user1 does not have sufficient funds to transfer", async () => {
        const res = await request
        .post('/wallet/transfer')
        .set("User-Agent", userAgent)
        .set('authorization', `Bearer ${token}`)
        .send({
            walletId: wallet2.id,
            amount: 10000
        })        

        assert.equal(res.status, 400);
        assert.include(res.body.message, 'Insufficient funds in wallet')
    })
})