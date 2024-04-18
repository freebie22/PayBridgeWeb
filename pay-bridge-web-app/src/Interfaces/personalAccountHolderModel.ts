export default interface personalAccountHolderProfileModel {
  accountId: number,
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  email: string;
  emailConfirmed : boolean,
  phoneNumber: string;
  postalCode: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  passportSeries: string;
  passportNumber: string;
  taxIdentificationNumber: string;
  profileImage: string;
}
