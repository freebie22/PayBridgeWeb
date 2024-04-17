import { createSlice } from "@reduxjs/toolkit";
import { bankAccountModel } from "../../Interfaces";

export const emptyBankAccountState = {
  bankAccount: {
    accountId: 0,
    accountNumber: "",
    accountOwnerFullName: "",
    accountType: "",
    isActive: false,
    status: "",
    bankName: "",
    bankCards: [],
    registrationDate: "",
  },
  bankAccounts: [],
};

export const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState: emptyBankAccountState,
  reducers: {
    setBankAccount: (state, action) => {
      state.bankAccount.accountId = action.payload.accountId;
      state.bankAccount.accountNumber = action.payload.accountNumber;
      state.bankAccount.accountOwnerFullName =
        action.payload.accountOwnerFullName;
      state.bankAccount.accountType = action.payload.accountType;
      state.bankAccount.isActive = action.payload.isActive;
      state.bankAccount.status = action.payload.status;
      state.bankAccount.bankName = action.payload.bankName;
      state.bankAccount.bankCards = action.payload.bankCards;
      state.bankAccount.registrationDate = action.payload.registrationDate;
    },
    setBankAccounts: (state, action) => {
      state.bankAccounts = action.payload.bankAccounts;
    },
  },
});

export const { setBankAccounts, setBankAccount } = bankAccountSlice.actions;
export const bankAccountReducer = bankAccountSlice.reducer;
