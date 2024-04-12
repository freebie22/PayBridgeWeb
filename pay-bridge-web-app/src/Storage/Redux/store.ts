import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./userAuthSlice";
import authApi from "../../APIs/userAPI";
import { PersonalAccountHolderProfileReducer } from "./personalAccountHolderSlice";
import accountHolderApi from "../../APIs/accountHolderAPI";



const store = configureStore({
    reducer: {
        userAuthStore : userAuthReducer,
        personalAccountHolderStore : PersonalAccountHolderProfileReducer,
        [authApi.reducerPath] : authApi.reducer,
        [accountHolderApi.reducerPath] : accountHolderApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware).concat(accountHolderApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
