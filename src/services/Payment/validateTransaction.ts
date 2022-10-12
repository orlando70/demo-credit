import { wrapServiceAction } from '..';
import {generalLogger} from '../../lib/logger';
import {PaystackEvent} from '../../payment/types';
import {WebhookHandler} from '../../payment/webHookHandler';
import { ValidateTransactionRequest } from '../../utils/validate';


export default wrapServiceAction({
  schema: ValidateTransactionRequest,
  handler: async (params: ValidateTransactionRequest) => {
    await WebhookHandler.handle(params);
  }
})
