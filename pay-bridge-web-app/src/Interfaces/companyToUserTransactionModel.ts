export default interface companyToUserTransactionModel {
  transactionId: number;
  transactionUniqueNumber: string;
  senderCompanyShortName: string;
  sender_CBA_IBANNumber: string;
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
}
