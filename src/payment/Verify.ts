import Requester from './Requester';

interface VerifyCard {
  bin: string;
}

type VerifyCardResponse = Partial<{
  bin: string;
  brand: string;
  sub_brand: string;
  countryCode: string;
  countryName: string;
  cardType: string;
  bank: string;
  linkedBankId: number;
  [key: string]: string | number;
}>;

type VerifyAccountNumber = {
  accountNumber: string;
  bankCode: string;
};

type VerifyAccountNumberResponse = {
  accountNumber: string;
  accountName: string;
};

export default class Verify extends Requester {
  path = '';

  /**
   * This verifies if a card is valid using the first 6 digits of the card number
   * @param bin string
   */
  async card(data: VerifyCard) {
    const url = `/decision/bin/${data.bin}`;

    const result = await this.makeRequest({
      method: 'GET',
      data,
      url,
    });

    return this.resolveResponse<VerifyCardResponse>(result);
  }

  /**
   * This verifies if an account number is valid given the bank code
   * @param accountNumber string
   * @param bankCode string
   */
  async accountNumber(data: VerifyAccountNumber) {
    const url = `/bank/resolve?account_number=${data.accountNumber}&bank_code=${data.bankCode}`;

    const result = await this.makeRequest({
      method: 'GET',
      data,
      url,
    });

    return this.resolveResponse<VerifyAccountNumberResponse>(result);
  }
}
