import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const accountHolderApi = createApi({
    reducerPath: "accountHolderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7112/api/"
    }),
    tagTypes: ["PersonalAccountHolders"],
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
        })
    })
})

export const {useGetPersonalAccountHoldersQuery, useGetPersonalAccountHolderByUserIdQuery, useCreatePersonalAccountHolderMutation} = accountHolderApi;
export default accountHolderApi;