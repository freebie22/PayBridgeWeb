import { createSlice } from "@reduxjs/toolkit";
import {userModel} from "../../Interfaces";


export const emptyUserState : userModel = {
    id : "",
    userName : "",
    email: "",
    role: ""
}

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: emptyUserState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.id = action.payload.id;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.role = action.payload.role;
        }
    }
});

export const {setLoggedInUser} = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;