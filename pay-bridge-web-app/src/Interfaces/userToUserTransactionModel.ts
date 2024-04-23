export default interface userToUserTransactionModel {
  transactionId: number;
  transactionUniqueNumber: string;
  senderCredentials: string;
  senderBankCardNumber: string;
  senderBankEmitent: string;
  receiverCredentials: string;
  receiverBankCardNumber: string;
  receiverBankEmitent: string;
  senderHolderId: number;
  receiverHolderId: number;
  currencyCode: string;
  amount: number;
  transactionType: string;
  dateOfTransaction: string;
  description: string;
  fee: number;
  status: string;
  stripePaymentIntentID: string;
}
