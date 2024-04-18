import { createSlice } from "@reduxjs/toolkit";
import { bankAccountModel } from "../../Interfaces";

export const emptyBankAccountState = {
  userBankAccounts: [],
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
    }
  },
});

export const { setUserBankAccounts, setAllBankAccounts} = bankAccountSlice.actions;
export const bankAccountReducer = bankAccountSlice.reducer;
