import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bankAccountApi = createApi({
  reducerPath: "bankAccountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7112/api",
  }),
  tagTypes: ["personalBankAccounts", "corporateBankAccounts"],
  endpoints: (builder) => ({
    getPersonalBankAccounts: builder.query({
      query: (accountHolderId?) => ({
        url: "/account/getPersonalBankAccounts",
        method: "GET",
        params: {
          accountHolderId,
        },
      }),
      providesTags: ["personalBankAccounts"],
    }),
    getPersonalBankAccountByHolderId: builder.query({
      query: (accountId) => ({
        url: `/account/getPersonalBankAccount/${accountId}`,
        method: "GET",
      }),
      providesTags: ["personalBankAccounts"],
    }),
    registerPersonalBankAccount: builder.mutation({
      query: (accountBody) => ({
        url: "/account/RegisterPersonalBankAccount",
        method: "POST",
        body: accountBody,
      }),
      invalidatesTags: ["personalBankAccounts"],
    }),
    getCorporateBankAccounts: builder.query({
      query: (accountHolderId?) => ({
        url: "/account/getCorporateBankAccounts",
        method: "GET",
        params: {
          accountHolderId,
        },
      }),
      providesTags: ["corporateBankAccounts"],
    }),
    getCorporateBankAccountById: builder.query({
      query: ({accountId, accountOwnerId}) => ({
         url: "/account/getCorporateBankAccount",
         method: "GET",
         params: {
            accountId: accountId,
            accountOwnerId: accountOwnerId
         }
      }),
       
      providesTags: ["corporateBankAccounts"],
    }),
    registerCorporateBankAccount: builder.mutation({
      query: (accountBody) => ({
        url: "/account/RegisterCorporateBankAccount",
        method: "POST",
        body: accountBody,
      }),
      invalidatesTags: ["corporateBankAccounts"],
    }),
  }),
});

export const {
  useGetPersonalBankAccountsQuery,
  useGetPersonalBankAccountByHolderIdQuery,
  useRegisterPersonalBankAccountMutation,
  useGetCorporateBankAccountsQuery,
  useGetCorporateBankAccountByIdQuery,
  useRegisterCorporateBankAccountMutation,
} = bankAccountApi;
export default bankAccountApi;
