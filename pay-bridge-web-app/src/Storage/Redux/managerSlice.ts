import { createSlice } from "@reduxjs/toolkit";
import { ManagerModel } from "../../Interfaces";


export const emptyManagerState : ManagerModel = {
    managerId: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    emailConfirmed : false,
    phoneNumber: "",
    position: "",
    description: "",
    profileImage: "",
    isActive: false,
}

export const managerSlice = createSlice({
    name : "Manager",
    initialState : emptyManagerState,
    reducers: {
        setManagerState : (state, action) => {(
            state.managerId = action.payload.managerId,
            state.firstName = action.payload.firstName,
            state.lastName = action.payload.lastName,
            state.middleName = action.payload.middleName,
            state.email = action.payload.email,
            state.emailConfirmed = action.payload.emailConfirmed,
            state.position = action.payload.position,
            state.phoneNumber = action.payload.phoneNumber,
            state.description = action.payload.description,
            state.profileImage = action.payload.description,
            state.isActive = action.payload.isActive
        )}
    }
    
})

export const {setManagerState} = managerSlice.actions;
export const managerReducer = managerSlice.reducer;