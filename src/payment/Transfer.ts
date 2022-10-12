/* eslint-disable no-underscore-dangle */
import Requester from './Requester';
import TransferRecipient from './TransferRecipient';
import {
  Ifinalize,
  IFinalizeTransferResponse,
  IInitiateTransferResponse,
  InitiateTransferData,
} from './types';

export default class Transfer extends Requester {
  path = '/transfer';

  private _recipient: TransferRecipient;

  constructor(key: string) {
    super(key);
    this._recipient = new TransferRecipient(key);
  }

  get recipient() {
    return this._recipient;
  }

  /**
   * This submits pin after the charge has been created succesfully
   * The input data would be in an object
   *
   * @param source string eg. "balance"
   * @param reason string
   * @param amount number
   * @param recipient string eg. "RCP_gx2wn530m0i3w3m"
   */
  async initiate(data: InitiateTransferData) {
    const url = `${this.path}`;

    const result = await this.makeRequest({
      method: 'POST',
      data,
      url,
    });

    return this.resolveResponse<IInitiateTransferResponse>(result);
  }

  async finalize(data: Ifinalize) {
    const url = `${this.path}/finalize_transfer`;

    const result = await this.makeRequest({
      method: 'POST',
      data,
      url,
    });

    return this.resolveResponse<IFinalizeTransferResponse>(result);
  }
}
