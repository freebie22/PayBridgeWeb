export default interface bankCardModel {
  bankCardId: number;
  cardNumber: string;
  expiryDate: string;
  cvc: number;
  ownerCredentials: string;
  currencyType: string;
  balance: number;
  isActive: boolean;
  registrationDate: string;
}