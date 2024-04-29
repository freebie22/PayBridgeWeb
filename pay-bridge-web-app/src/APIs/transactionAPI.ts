import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const transactionAPI = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7112/api/",
  }),
  tagTypes: [
    "UserToUserTransactions",
    "UserToCompanyTransactions",
    "CompanyToUserTransactions",
    "CompanyToCompanyTransactions",
  ],
  endpoints: (builder) => ({
    getUserToUserTransactions: builder.query({
      query: (accountId?) => ({
        url: "transactions/GetAllUserToUserTransactions",
        method: "GET",
        params: {
          accountId: accountId,
        },
      }),
      providesTags: ["UserToUserTransactions"],
    }),
    getUserToUserTransactionById: builder.query({
      query: (transactionNumber) => ({
        url: `transactions/GetUserToUserTransaction`,
        method: "GET",
        params: {
          transactionNumber: transactionNumber,
        },
      }),
      providesTags: ["UserToUserTransactions"],
    }),
    makeUserToUserTransaction: builder.mutation({
      query: (transactionBody) => ({
        url: "transactions/MakeUserToUserTransaction",
        method: "POST",
        body: transactionBody,
      }),
      invalidatesTags: ["UserToUserTransactions"],
    }),
    getCompanyToUserTransactions: builder.query({
      query: ({senderAccountId, receiverAccountId}) => ({
        url: "transactions/GetAllCompanyToUserTransactions",
        method: "GET",
        params: {
          senderAccountId: senderAccountId,
          receiverAccountId: receiverAccountId
        },
      }),
      providesTags: ["CompanyToUserTransactions"],
    }),
    getCompanyToUserTransactionById: builder.query({
      query: (transactionNumber) => ({
        url: `transactions/GetCompanyToUserTransaction`,
        method: "GET",
        params: {
          transactionNumber: transactionNumber,
        },
      }),
      providesTags: ["CompanyToUserTransactions"],
    }),
    makeCompanyToUserTransaction: builder.mutation({
      query: (transactionBody) => ({
        url: "transactions/MakeCompanyToUserTransaction",
        method: "POST",
        body: transactionBody,
      }),
      invalidatesTags: ["CompanyToUserTransactions"],
    }),
    getUserToCompanyTransactions: builder.query({
      query: (args) => {
        const {senderAccountId, receiverAccountId} = args;
        return {
          url: "transactions/GetAllUserToCompanyTransactions",
          method: "GET",
          params: {
            senderAccountId: senderAccountId,
            receiverAccountId: receiverAccountId
          },
        }
      },
      providesTags: ["UserToCompanyTransactions"],
    }),
    getUserToCompanyTransactionsById: builder.query({
      query: (transactionNumber) => ({
        url: `transactions/GetUserToCompanyTransactions`,
        method: "GET",
        params: {
          transactionNumber: transactionNumber,
        },
      }),
      providesTags: ["UserToCompanyTransactions"],
    }),
    makeUserToCompanyTransactions: builder.mutation({
      query: (transactionBody) => ({
        url: "transactions/MakeUserToCompanyTransaction",
        method: "POST",
        body: transactionBody,
      }),
      invalidatesTags: ["UserToCompanyTransactions"],
    }),
    getCompanyToCompanyTransactions: builder.query({
      query: (accountId?) => ({
        url: "transactions/GetAllCompanyToCompanyTransactions",
        method: "GET",
        params: {
          accountId: accountId,
        },
      }),
      providesTags: ["CompanyToCompanyTransactions"],
    }),
    getCompanyToCompanyTransactionsById: builder.query({
      query: (transactionNumber) => ({
        url: `transactions/GetCompanyToCompanyTransactions`,
        method: "GET",
        params: {
          transactionNumber: transactionNumber,
        },
      }),
      providesTags: ["CompanyToCompanyTransactions"],
    }),
    makeCompanyToCompanyTransactions: builder.mutation({
      query: (transactionBody) => ({
        url: "transactions/MakeCompanyToCompanyTransaction",
        method: "POST",
        body: transactionBody,
      }),
      invalidatesTags: ["CompanyToCompanyTransactions"],
    }),
  }),
});

export const {
  useGetUserToUserTransactionsQuery,
  useGetUserToUserTransactionByIdQuery,
  useMakeUserToUserTransactionMutation,
  useGetUserToCompanyTransactionsQuery,
  useGetUserToCompanyTransactionsByIdQuery,
  useMakeUserToCompanyTransactionsMutation,
  useGetCompanyToUserTransactionsQuery,
  useGetCompanyToUserTransactionByIdQuery,
  useMakeCompanyToUserTransactionMutation,
  useGetCompanyToCompanyTransactionsQuery,
  useGetCompanyToCompanyTransactionsByIdQuery,
  useMakeCompanyToCompanyTransactionsMutation
} = transactionAPI;
export default transactionAPI;
