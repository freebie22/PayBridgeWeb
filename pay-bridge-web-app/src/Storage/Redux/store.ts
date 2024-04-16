import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./userAuthSlice";
import authApi from "../../APIs/userAPI";
import { PersonalAccountHolderProfileReducer } from "./personalAccountHolderSlice";
import accountHolderApi from "../../APIs/accountHolderAPI";
import { ChangePasswordReducer } from "./changePasswordSlice";
import managerApi from "../../APIs/managerAPI";
import { managerReducer } from "./managerSlice";



const store = configureStore({
    reducer: {
        userAuthStore : userAuthReducer,
        personalAccountHolderStore : PersonalAccountHolderProfileReducer,
        changePasswordStore : ChangePasswordReducer,
        managerStore : managerReducer,
        [authApi.reducerPath] : authApi.reducer,
        [accountHolderApi.reducerPath] : accountHolderApi.reducer,
        [managerApi.reducerPath] : managerApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware).concat(accountHolderApi.middleware).concat(managerApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
