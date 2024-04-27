import { createSlice } from "@reduxjs/toolkit";
import { responsiblePerson } from "../../Interfaces";

export const emptyResponsiblePersonState: responsiblePerson = {
  responsiblePersonId: 0,
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  emailConfirmed: false,
  phoneNumber: "",
  companyFullName: "",
  positionInCompany: "",
  isActive: false,
};

export const responsiblePersonSlice = createSlice({
  name: "responsiblePerson",
  initialState: emptyResponsiblePersonState,
  reducers: {
    setResponsiblePersonState: (state, action) => {
      state.responsiblePersonId = action.payload.responsiblePersonId,
        state.firstName = action.payload.firstName,
        state.lastName = action.payload.lastName,
        state.middleName = action.payload.middleName,
        state.email = action.payload.email,
        state.emailConfirmed = action.payload.emailConfirmed,
        state.phoneNumber = action.payload.phoneNumber,
        state.companyFullName = action.payload.companyFullName,
        state.positionInCompany = action.payload.positionInCompany,
        state.isActive = action.payload.isActive
    }
  },
});

export const { setResponsiblePersonState } = responsiblePersonSlice.actions;
export const responsiblePersonReducer = responsiblePersonSlice.reducer;
