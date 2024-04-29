export default interface companyToCompanyToTransactionModel {
  transactionId: number;
  transactionUniqueNumber: string;
  senderCompanyShortName: string;
  sender_CBA_IBANNumber: string;
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
}
