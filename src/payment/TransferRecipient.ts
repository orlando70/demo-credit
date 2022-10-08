import Requester from './Requester';
import { IReciepientResponse, TransferReciepientData } from './types';

export default class TransferReciepient extends Requester {
  path = '/transferrecipient';

  /**
   * This submits pin after the charge has been created succesfully
   * The input data would be in an object
   *
   * @param type string eg. "balance"
   * @param name string
   * @param currency number
   * @param bank_code string
   * @param accountNumber string
   * @example {
      "type": "nuban",
      "name": "Tolu Robert",
      "accountNumber": "01000000010",
      "bankCode": "058",
      "currency": "NGN"
    }
   */
  async create(data: TransferReciepientData) {
    const url = `${this.path}`;

    const result = await this.makeRequest({
      method: 'POST',
      data,
      url,
    });

    return this.resolveResponse<IReciepientResponse>(result);
  }
}
