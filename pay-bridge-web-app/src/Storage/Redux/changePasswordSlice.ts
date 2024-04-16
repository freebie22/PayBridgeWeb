import { createSlice } from "@reduxjs/toolkit";
import { changePasswordModel } from "../../Interfaces";


export const emptyChangePasswordState : changePasswordModel = {
    login : "",
    confirmToken : ""
}


export const changePasswordSlice = createSlice({
    name : "ChangePassword",
    initialState : emptyChangePasswordState,
    reducers : {
        setChangePasswordState : (state, action) => {
            state.login = action.payload.login;
            state.confirmToken = action.payload.confirmToken;
        }
    }
})

export const {setChangePasswordState} = changePasswordSlice.actions;
export const ChangePasswordReducer = changePasswordSlice.reducer;