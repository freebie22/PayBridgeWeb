import bankCardModel from "./bankCardModel";

export default interface bankAccountModel {
  accountId: number;
  accountNumber: string;
  accountOwnerFullName: string;
  accountType: string;
  isActive: boolean;
  status: string;
  bankName: string;
  bankCards: Array<bankCardModel>;
  registrationDate: string;
}
