export default interface corporateAccountHolder {
  accountId: number;
  shortCompanyName: string;
  fullCompanyName: string;
  companyCode: string;
  contactEmail: string;
  contactPhone: string;
  emailConfirmed: boolean;
  dateOfEstablishment: string;
  postalCode: number;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  isActive: boolean;
  status: string;
  responsiblePersonId: number;
}
