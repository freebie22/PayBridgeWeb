export default interface userToCompanyTransactionModel {
  transactionId: number;
  transactionUniqueNumber: string;
  senderCredentials: string;
  senderBankCardNumber: string;
  senderBankEmitent: string;
  receiverCompanyShortName: string;
  receiver_CBA_IBANNumber: string;
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
