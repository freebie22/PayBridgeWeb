import { createSlice } from "@reduxjs/toolkit";
import { bankAccountModel } from "../../Interfaces";

export const emptyBankAccountState = {
  userBankAccounts: [],
  corporateBankAccounts: [],
  allBankAccounts: [],
};

export const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState: emptyBankAccountState,
  reducers: {
    setUserBankAccounts: (state, action) => {
      state.userBankAccounts = action.payload;
    },
    setAllBankAccounts: (state, action) => {
      state.allBankAccounts = action.payload;
    },
    setCorporateBankAccounts: (state, action) => {
      state.corporateBankAccounts = action.payload;
    }
  },
});

export const { setUserBankAccounts, setAllBankAccounts, setCorporateBankAccounts} = bankAccountSlice.actions;
export const bankAccountReducer = bankAccountSlice.reducer;
