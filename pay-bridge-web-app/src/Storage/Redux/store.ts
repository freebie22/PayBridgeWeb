import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./userAuthSlice";
import authApi from "../../APIs/userAPI";
import { PersonalAccountHolderProfileReducer } from "./personalAccountHolderSlice";
import accountHolderApi from "../../APIs/accountHolderAPI";
import { ChangePasswordReducer } from "./changePasswordSlice";
import managerApi from "../../APIs/managerAPI";
import { managerReducer } from "./managerSlice";
import bankAccountApi from "../../APIs/bankAccountAPI";
import { bankAccountReducer } from "./bankAccountSlice";
import bankApi from "../../APIs/bankAPI";
import { bankSliceReducer } from "./bankSlice";



const store = configureStore({
    reducer: {
        userAuthStore : userAuthReducer,
        personalAccountHolderStore : PersonalAccountHolderProfileReducer,
        changePasswordStore : ChangePasswordReducer,
        managerStore : managerReducer,
        bankAccountStore : bankAccountReducer,
        bankStore : bankSliceReducer,
        [authApi.reducerPath] : authApi.reducer,
        [accountHolderApi.reducerPath] : accountHolderApi.reducer,
        [managerApi.reducerPath] : managerApi.reducer,
        [bankAccountApi.reducerPath] : bankAccountApi.reducer,
        [bankApi.reducerPath] : bankApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware).concat(accountHolderApi.middleware).concat(managerApi.middleware).concat(bankAccountApi.middleware).concat(bankApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
