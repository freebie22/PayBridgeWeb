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
            state.userToUserTransactions = action.payload;
        },
        setUserToCompanyTransactions: (state, action) => {
            state.userToCompanyTranasctions = action.payload;
        },
        setCompanyToUserTransactions: (state, action) => {
            state.companyToUserTransactions = action.payload;
        },
        setCompanyToCompanyTransactions: (state, action) => {
            state.companyToCompanyTransactions = action.payload;
        }
    }
})

export const {setUserToUserTransactions, setUserToCompanyTransactions, setCompanyToUserTransactions, setCompanyToCompanyTransactions} = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;