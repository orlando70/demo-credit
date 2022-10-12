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
