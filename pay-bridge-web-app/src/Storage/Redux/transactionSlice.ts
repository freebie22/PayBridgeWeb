import { createSlice } from "@reduxjs/toolkit"


export const emptyTransactionState = {
    userToUserTransactions: [],
    userToCompanyTranasctions: [],
    companyToUserTransactions: [],
    companyToCompanyTransactions: [],
}


export const transactionSlice = createSlice({
    name: "Tranasction",
    initialState: emptyTransactionState,
    reducers: {
        setUserToUserTransactions: (state, action) => {
            state.userToUserTransactions = action.payload.userToUserTransactions;
        },
        setUserToCompanyTransactions: (state, action) => {
            state.userToCompanyTranasctions = action.payload.userToCompanyTransactions;
        },
        setCompanyToUserTransactions: (state, action) => {
            state.companyToUserTransactions = action.payload.companyToUserTransactions;
        },
        setCompanyToCompanyTransactions: (state, action) => {
            state.companyToCompanyTransactions = action.payload.companyToCompanyTransactions;
        }
    }
})

export const {setUserToUserTransactions, setUserToCompanyTransactions, setCompanyToUserTransactions, setCompanyToCompanyTransactions} = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;