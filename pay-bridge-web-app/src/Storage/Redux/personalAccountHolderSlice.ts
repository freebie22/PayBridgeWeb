import { createSlice } from "@reduxjs/toolkit";
import { personalAccountHolderProfileModel } from "../../Interfaces";

export const emptyProflieState: personalAccountHolderProfileModel = {
  accountId: 0,
  firstName: "",
  lastName: "",
  middleName: "",
  dateOfBirth: "",
  email: "",
  emailConfirmed: false,
  phoneNumber: "",
  postalCode: "",
  country: "",
  state: "",
  city: "",
  streetAddress: "",
  passportSeries: "",
  passportNumber: "",
  taxIdentificationNumber: "",
  profileImage: ""
};

export const PersonalAccountHolderProfileSlice = createSlice({
  name: "PersonalAccountHolderProfile",
  initialState: emptyProflieState,
  reducers: {
    setProfileState: (state, action) => {
      state.accountId = action.payload.accountId;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.middleName = action.payload.middleName;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.email = action.payload.email;
      state.emailConfirmed = action.payload.emailConfirmed;
      state.phoneNumber = action.payload.phoneNumber;
      state.postalCode = action.payload.postalCode;
      state.country = action.payload.country;
      state.state = action.payload.state;
      state.city = action.payload.city;
      state.streetAddress = action.payload.streetAddress;
      state.passportSeries = action.payload.passportSeries;
      state.passportNumber = action.payload.passportNumber;
      state.taxIdentificationNumber = action.payload.taxIdentificationNumber;
      state.profileImage = action.payload.profileImage;
    },
  },
});

export const {setProfileState} = PersonalAccountHolderProfileSlice.actions;
export const PersonalAccountHolderProfileReducer = PersonalAccountHolderProfileSlice.reducer;
