import { createSlice } from "@reduxjs/toolkit/react"


export const emptyBankState = {
    banks: []
}

export const bankSlice = createSlice({
    name: "Bank",
    initialState : emptyBankState,
    reducers: {
        setBanksState : (state, action) => {
            state.banks = action.payload;
        }
    }
})

export const {setBanksState} = bankSlice.actions;
export const bankSliceReducer = bankSlice.reducer;