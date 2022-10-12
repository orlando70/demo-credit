import axios, {Method} from 'axios';
import camelcaseKeys from 'camelcase-keys';
import {ServiceError} from '../lib/errors';
import generalLogger from '../lib/logger';

const instance = axios.create();

type RequestParams = {url: string; method: Method; data: any};
interface PaystackResponse {
  status: boolean; // Only true if the details provided could be processed and no error occured while processing
  message: string; // Explains why status is false... Entirely informational. Please only log this but do not use for your checks
  data: any;
}

export default class Requester {
  protected path: string | undefined;

  contentType = undefined;

  baseUrl = 'api.paystack.co';

  constructor(private key?: string) {}

  // eslint-disable-next-line class-methods-use-this
  resolveResponse<T extends Record<string, any>>(result: PaystackResponse) {
    if (!result.status) throw new Error('invalid response');
    return {...result.data, message: result.message} as T;
  }

  async makeRequest({url, method, data}: RequestParams) {
    try {
      const fullUrl = `https://${this.baseUrl}${url}`;
      const result = await instance.request({
        data,
        url: fullUrl,
        method,
        headers: {
          'Content-Type':
            this.contentType !== undefined
              ? this.contentType
              : 'application/json',
          ...(this.key ? {Authorization: `Bearer ${this.key}`} : {}),
        } as any,
      });

      return camelcaseKeys(result.data, {deep: true});
    } catch (err: any) {
      if (err.isAxiosError && err.response)
        return Promise.reject(new ServiceError(err.response.data.message));
      generalLogger.error(err);
      return Promise.reject(err);
    }
  }
}
