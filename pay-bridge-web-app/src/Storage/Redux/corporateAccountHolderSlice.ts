import { createSlice } from "@reduxjs/toolkit";
import { corporateAccountHolder } from "../../Interfaces";



export const emptyCorporateAccountHolderState : corporateAccountHolder = {
    accountId: 0,
    shortCompanyName: "",
    fullCompanyName: "",
    companyCode: "",
    contactEmail: "",
    contactPhone: "",
    emailConfirmed: false,
    dateOfEstablishment: "",
    postalCode: 0,
    country: "",
    state: "",
    city: "",
    streetAddress: "",
    isActive: false,
    status: "",
    responsiblePersonId: 0
}

export const corporateAccountHolderSlice = createSlice({
    name: "corporateAccountHolder",
    initialState: emptyCorporateAccountHolderState,
    reducers : {
        setCorporateAccountState: (state, action) => {
            state.accountId = action.payload.accountId,
            state.shortCompanyName = action.payload.shortCompanyName,
            state.fullCompanyName = action.payload.fullCompanyName,
            state.companyCode = action.payload.companyCode,
            state.contactEmail = action.payload.contactEmail,
            state.contactPhone = action.payload.contactPhone,
            state.emailConfirmed = action.payload.emailConfirmed,
            state.dateOfEstablishment = action.payload.dateOfEstablishment,
            state.postalCode = action.payload.postalCode,
            state.country = action.payload.country,
            state.state = action.payload.state,
            state.city = action.payload.city,
            state.streetAddress = action.payload.streetAddress,
            state.isActive = action.payload.isActive,
            state.status = action.payload.status,
            state.responsiblePersonId = action.payload.responsiblePersonId}
        
    }
})

export const {setCorporateAccountState} = corporateAccountHolderSlice.actions;
export const corporateAccountHolderReducer = corporateAccountHolderSlice.reducer;