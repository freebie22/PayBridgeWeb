import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const bankAccountApi = createApi({
    reducerPath: "bankAccountApi",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://localhost:7112/api",
    }),
    endpoints: (builder) => ({
        getPersonalBankAccounts : builder.query({
            query: () => ({
                url: "/account/getPersonalBankAccounts",
                method: "GET"
            })
        }),
        getPersonalBankAccountByHolderId : builder.query({
            query: (holderId) => ({
                url: `/account/getPersonalBankAccounts/${holderId}`,
                method: "GET"
            })
        }),
    })
})

export const {useGetPersonalBankAccountsQuery, useGetPersonalBankAccountByHolderIdQuery} = bankAccountApi;
export default bankAccountApi;