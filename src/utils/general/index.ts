import crypto from 'crypto';
import TransactionRepo from '../../database/repositories/TransactionsRepo';
import {ServiceError} from '../../lib/errors';

export const generateReferenceCode = async () => {
  const existingRefCode = true;
  let generatedRefCode!: string;
  while (existingRefCode) {
    generatedRefCode = generateRandomCode(7);
    // eslint-disable-next-line no-await-in-loop
    const accountWithRefCode = await TransactionRepo.getTransactionByReference(
      generatedRefCode
    );
    if (!accountWithRefCode) break;
  }

  if (!generatedRefCode) throw new ServiceError('unable to create transaction');
  return generatedRefCode;
};

export function generateRandomCode(length: number) {
  return crypto
    .randomBytes(length * 3)
    .toString('base64')
    .split('+')
    .join('')
    .split('/')
    .join('')
    .split('=')
    .join('')
    .substr(0, length);
}
