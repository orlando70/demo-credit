import Requester from './Requester';

export interface TransactionData {
  email: string;
  amount: string;
}

export interface TransactionAuthorizationData extends TransactionData {
  authorizationCode: string;
  metadata?: Record<string, any>;
}

interface TransactionInitData extends TransactionData {
  metadata?: Record<string, any>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TransactionInitResponse {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  metadata?: Record<string, any>;
}

type TransactionAuthCodeCharge = {
  amount: string;
  currency: string;
  transaction_date: Date;
  status: 'success' | 'failed';
  reference: string;
  [key: string]: any;
  authorization: {
    authorizationCode: string;
    bin: number;
    last4: string;
    expMonth: string;
    expYear: string;
    [key: string]: any;
  };
  customer: {
    [key: string]: any;
  };
};

export type PaystackEventType =
  | 'charge.dispute.create'
  | 'charge.dispute.remind'
  | 'charge.dispute.resolve'
  | 'charge.success'
  | 'customeridentification.failed'
  | 'customeridentification.success'
  | 'invoice.create'
  | 'invoice.payment_failed'
  | 'invoice.update'
  | 'paymentrequest.pending'
  | 'paymentrequest.success'
  | 'subscription.create'
  | 'subscription.disable'
  | 'subscription.expiring_cards'
  | 'subscription.not_renew'
  | 'transfer.failed'
  | 'transfer.success'
  | 'transfer.reversed';

export default class Transactions extends Requester {
  path = '/transaction';

  /**
   * This checks if the authorizationCode is a valid one or if it can be charged
   * The input data would be in an object
   *
   * @param email string
   * @param amount string
   * @param authorizationCode string
   */

  async chargeAuthorization(data: TransactionAuthorizationData) {
    const url = `${this.path}/charge_authorization`;

    const result = await this.makeRequest({
      method: 'POST',
      data,
      url,
    });

    return this.resolveResponse<TransactionAuthCodeCharge>(result);
  }

  /**
   * This checks if the authorizationCode is a valid one or if it can be charged
   * The input data would be in an object
   *
   * @param email string
   * @param amount string
   * @param authorizationCode string
   */

  async checkAuthorization(data: TransactionAuthorizationData) {
    const url = `${this.path}/check_authorization`;

    const result = await this.makeRequest({
      method: 'POST',
      data,
      url,
    });

    return this.resolveResponse(result);
  }

  /**
   * This submits pin after the charge has been created succesfully
   * The input data would be in an object
   *
   * @param email string
   * @param amount string
   * @param metadata json Optional
   * @example { "email": "customer@email.com", "amount": "20000", metadata: { transactionId: "bla" } }
   */
  async initialize(data: TransactionInitData) {
    const url = `${this.path}/initialize`;

    const result = await this.makeRequest({
      method: 'POST',
      data,
      url,
    });

    return this.resolveResponse<TransactionInitResponse>(result);
  }
}
