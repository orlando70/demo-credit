import Requester from './Requester';
import {ChargeCreationData} from './types';

export default class Charge extends Requester {
  path = '/charge';

  /**
   * This submits pin after the charge has been created succesfully
   * The input data would be in an object
   *
   * @param email string
   * @param amount string
   * @param metadata string (Optional)
   * @param card object (Optional)
   * @param bank object (Optional)
   * @param authorizationCode string (Optional)
   */
  async create(data: ChargeCreationData) {
    const url =
      'authorizationCode' in data
        ? `/transaction${this.path}_authorization`
        : this.path;

    const result = await this.makeRequest({
      method: 'post',
      data,
      url,
    });

    return this.resolveResponse(result);
  }
}
/**
 * Test Cards: https://paystack.com/docs/payments/test-payments
 * APIs: https://paystack.com/docs/api
 */
