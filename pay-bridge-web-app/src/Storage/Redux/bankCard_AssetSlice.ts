import { createSlice } from "@reduxjs/toolkit/react"


export const emptyBankCard_AssetState = {
    bankCards: [],
    bankAssets: [],
}


export const bankCard_AssetSlice = createSlice({
    name: "BankCard_Asset",
    initialState : emptyBankCard_AssetState,
    reducers: {
        setBankCardsState : (state, action) => {
            state.bankCards = action.payload;
        },
        setBankAssetsState: (state, action) => {
            state.bankAssets = action.payload;
        }
    }
})

export const {setBankCardsState, setBankAssetsState} = bankCard_AssetSlice.actions;
export const bankCard_AssetReducer = bankCard_AssetSlice.reducer;