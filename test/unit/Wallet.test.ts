import { assert } from 'chai';
import { faker } from '@faker-js/faker';
import { getLoginData, LoginType } from '..';
import WalletRepo, { Wallet } from '../../src/database/repositories/WalletRepo';

export const userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';


let user1: LoginType;
let user2: LoginType;
let wallet1: Wallet
let wallet2: Wallet

const userCredentials1 = {
    email: faker.internet.email(),
    password: faker.internet.password(),
}

const userCredentials2 = {
    email: faker.internet.email(),
    password: faker.internet.password()
}

before(async () => {
    //USER1 config
    user1 = await getLoginData(userCredentials1.email, userCredentials1.password);

    wallet1 = (await WalletRepo.getWalletByUser(user1))!

    //Add 3000 to wallet balance of user1
    await WalletRepo.updateBalance(wallet1, 3000);

    //USER2 config
    user2 = await getLoginData(userCredentials2.email, userCredentials2.password);

    wallet2 = (await WalletRepo.getWalletByUser(user2))!;
})

describe('Wallet-UNIT', () => {


    it("should confirm sender's wallet is deducted and receiver's wallet is credited correctly", async () => {

        const a = await WalletRepo.transfer(wallet1, wallet2, 300);

        const updatedWallet1 = await WalletRepo.getWalletByUser(user1);
        const updatedWallet2 = await WalletRepo.getWalletByUser(user2);


        assert.equal(updatedWallet1?.balance, 2700);
        assert.equal(updatedWallet2?.balance, 300);

    })
})