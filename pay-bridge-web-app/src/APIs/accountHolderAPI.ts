import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const accountHolderApi = createApi({
    reducerPath: "accountHolderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7112/api/"
    }),
    tagTypes: ["PersonalAccountHolders", "CorporateAccountHolders"],
    endpoints: (builder) => ({
        getPersonalAccountHolders : builder.query({
            query : () => ({
                url: "accountHolder/GetPersonalAccountHolders",
                method: "GET"
            }),
            providesTags : ["PersonalAccountHolders"]
        }),
        getPersonalAccountHolderByUserId : builder.query({
            query : (userId : string) => ({
                url: "accountHolder/GetPersonalAccountHolder",
                method: "GET",
                params : {
                    userId : userId
                }
            }),
            providesTags : ["PersonalAccountHolders"]
        }),
        createPersonalAccountHolder : builder.mutation({
            query: (holderBody) => ({
                url: "accountHolder/CreatePersonalAccountHolder",
                method: "POST",
                body : holderBody
            }),
            invalidatesTags : ["PersonalAccountHolders"]
        }),
        getCorporateAccountHolders : builder.query({
            query : () => ({
                url: "accountHolder/GetCorporateAccountHolders",
                method: "GET"
            }),
            providesTags : ["CorporateAccountHolders"]
        }),
        getCorporateAccountHolderByUserId : builder.query({
            query : (responsiblePersonId : number) => ({
                url: "accountHolder/GetCorporateAccountHolder",
                method: "GET",
                params : {
                    responsiblePersonId : responsiblePersonId
                }
            }),
            providesTags : ["CorporateAccountHolders"]
        }),
        createCorporateAccountHolder : builder.mutation({
            query: (holderBody) => ({
                url: "accountHolder/CreateCorporateAccountHolder",
                method: "POST",
                body : holderBody
            }),
            invalidatesTags : ["CorporateAccountHolders"]
        }),
    })
})

export const {useGetPersonalAccountHoldersQuery, useGetPersonalAccountHolderByUserIdQuery, useCreatePersonalAccountHolderMutation, useGetCorporateAccountHoldersQuery, useGetCorporateAccountHolderByUserIdQuery, useCreateCorporateAccountHolderMutation} = accountHolderApi;
export default accountHolderApi;