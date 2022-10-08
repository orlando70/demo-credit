import Requester from './Requester';
import {
  ChargeCreationData, SubmitBirthdayData, SubmitOtpData, SubmitPhoneData, SubmitPinData,
} from './types';

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
    const url = 'authorizationCode' in data ? `/transaction${this.path}_authorization` : this.path;

    const result = await this.makeRequest({
      method: 'post',
      data,
      url,
    });

    return this.resolveResponse(result);
  }

  /**
   * This submits pin after the charge has been created succesfully.
   * The input data would be in an object
   *
   * @param pin string
   * @param reference string
   */
  async submitPin(data: SubmitPinData) {
    const url = `${this.path}/submit_pin`;

    const result = await this.makeRequest({
      method: 'POST',
      data,
      url,
    });

    return this.resolveResponse(result);
  }

  /**
   * This submits pin after the charge has been created succesfully.
   * The input data would be in an object
   *
   * @param phone string
   * @param reference string
   */
  async submitPhone(data: SubmitPhoneData) {
    const url = `${this.path}/submit_phone`;

    const result = await this.makeRequest({
      method: 'POST',
      data,
      url,
    });

    return this.resolveResponse(result);
  }

  /**
   * This submits pin after the charge has been created succesfully.
   * The input data would be in an object
   *
   * @param birthday string
   * @param reference string
   * @example { "birthday": "1961-09-21", "reference": "5bwib5v6anhe9xa" }
   */
  async submitBirthday(data: SubmitBirthdayData) {
    const url = `${this.path}/submit_birthday`;

    const result = await this.makeRequest({
      method: 'POST',
      data,
      url,
    });

    return this.resolveResponse(result);
  }

  /**
   * This submits pin after the charge has been created succesfully.
   * The input data would be in an object
   *
   * @param otp string
   * @param reference string
   */
  async submitOtp(data: SubmitOtpData) {
    const url = `${this.path}/submit_otp`;

    const result = await this.makeRequest({
      method: 'POST',
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
