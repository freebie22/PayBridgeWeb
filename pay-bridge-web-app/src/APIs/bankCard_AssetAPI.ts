import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bankCard_AssetAPI = createApi({
  reducerPath: "bankCard_AssetAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7112/api/",
  }),
  tagTypes: ["BankCards", "BankAssets"],
  endpoints: (builder) => ({
    getBankCards: builder.query({
      query: (accountHolderId?) => ({
        url: "bankAccount/GetBankCards",
        method: "GET",
        params: {
          accountHolderId: accountHolderId,
        },
      }),
      providesTags: ["BankCards"],
    }),
    getBankCardById: builder.query({
      query: (id) => ({
        url: `bankAccount/GetBankCards/${id}`,
        method: "GET",
      }),
      providesTags: ["BankCards"],
    }),
    addBankCard: builder.mutation({
      query: (cardBody) => ({
        url: "bankAccount/AddBankCard",
        method: "POST",
        body: cardBody
      }),
      invalidatesTags: ["BankCards"]
    }),
    getBankAssets: builder.query({
      query: (responsiblePersonId? : number) => ({
        url: "bankAccount/GetBankAssets",
        method: "GET",
        params: {
          responsiblePersonId : responsiblePersonId
        }
      })
    }),
    getBankAssetById: builder.query({
      query: (id: number) => ({
        url: `bankAccount/GetBankAsset/${id}`,
        method: "GET"
      })
    }),
    createBankAsset: builder.mutation({
      query: (bankAssetBody) => ({
        url: "bankAccount/CreateBankAsset",
        method: "POST",
        body: bankAssetBody
      })
    })
  }),
});

export const { useGetBankCardsQuery, useGetBankCardByIdQuery, useAddBankCardMutation, useGetBankAssetsQuery, useGetBankAssetByIdQuery, useCreateBankAssetMutation } =
  bankCard_AssetAPI;
export default bankCard_AssetAPI;
