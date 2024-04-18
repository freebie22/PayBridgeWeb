import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const bankAccountApi = createApi({
    reducerPath: "bankAccountApi",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://localhost:7112/api",
    }),
    tagTypes: ["personalBankAccounts"],
    endpoints: (builder) => ({
        getPersonalBankAccounts : builder.query({
            query: (accountHolderId?) => ({
                url: "/account/getPersonalBankAccounts",
                method: "GET",
                params: {
                    accountHolderId
                }
            }),
            providesTags: ["personalBankAccounts"]
        }),
        getPersonalBankAccountByHolderId : builder.query({
            query: (accountId) => ({
                url: `/account/getPersonalBankAccount/${accountId}`,
                method: "GET"
            }),
            providesTags: ["personalBankAccounts"]
        }),
        registerPersonalBankAccount : builder.mutation({
            query: (accountBody) => ({
                url : "/account/RegisterPersonalBankAccount",
                method : "POST",
                body : accountBody
            }),
            invalidatesTags : ["personalBankAccounts"]
        })
    })
})

export const {useGetPersonalBankAccountsQuery, useGetPersonalBankAccountByHolderIdQuery, useRegisterPersonalBankAccountMutation} = bankAccountApi;
export default bankAccountApi;