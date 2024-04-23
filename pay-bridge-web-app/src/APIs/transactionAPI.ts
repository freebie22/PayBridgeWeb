import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const transactionAPI = createApi({
    reducerPath: "transactionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7112/api/"
    }),
    tagTypes: ["UserToUserTransactions", "UserToCompanyTransactions", "CompanyToUserTransactions", "CompanyToCompanyTransactions"],
    endpoints: (builder) => ({
        getUserToUserTransactions: builder.query({
            query: (accountId?) => ({
                url: "transactions/GetAllUserToUserTransactions",
                method: "GET",
                params: {
                    accountId: accountId
                }
            }),
            providesTags: ["UserToUserTransactions"]
        }),
        getUserToUserTransactionById: builder.query({
            query: (transactionNumber) => ({
                url: `transactions/GetUserToUserTransaction`,
                method: "GET",
                params: {
                    transactionNumber: transactionNumber
                }
            }),
            providesTags: ["UserToUserTransactions"]
        }),

    })

})

export const {useGetUserToUserTransactionsQuery, useGetUserToUserTransactionByIdQuery} = transactionAPI;
export default transactionAPI;