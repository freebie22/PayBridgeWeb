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
import bankCard_AssetAPI from "../../APIs/bankCard_AssetAPI";
import { bankCard_AssetReducer } from "./bankCard_AssetSlice";
import transactionAPI from "../../APIs/transactionAPI";
import { transactionReducer } from "./transactionSlice";
import { citiesAndVillagesReducer } from "./cititesAndVillagesSlice";
import { corporateAccountHolderReducer } from "./corporateAccountHolderSlice";
import { responsiblePersonReducer } from "./responsiblePersonSlice";
import responsiblePersonApi from "../../APIs/responsiblePersonAPI";

const store = configureStore({
  reducer: {
    userAuthStore: userAuthReducer,
    personalAccountHolderStore: PersonalAccountHolderProfileReducer,
    changePasswordStore: ChangePasswordReducer,
    managerStore: managerReducer,
    bankAccountStore: bankAccountReducer,
    bankStore: bankSliceReducer,
    bankCard_AssetStore: bankCard_AssetReducer,
    transactionStore: transactionReducer,
    citiesAndVillagesStore: citiesAndVillagesReducer,
    corporateAccountHolderStore: corporateAccountHolderReducer,
    responsiblePersonStore: responsiblePersonReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountHolderApi.reducerPath]: accountHolderApi.reducer,
    [managerApi.reducerPath]: managerApi.reducer,
    [bankAccountApi.reducerPath]: bankAccountApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [bankCard_AssetAPI.reducerPath]: bankCard_AssetAPI.reducer,
    [transactionAPI.reducerPath] : transactionAPI.reducer,
    [responsiblePersonApi.reducerPath] : responsiblePersonApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(accountHolderApi.middleware)
      .concat(managerApi.middleware)
      .concat(bankAccountApi.middleware)
      .concat(bankApi.middleware)
      .concat(bankCard_AssetAPI.middleware)
      .concat(transactionAPI.middleware)
      .concat(responsiblePersonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
