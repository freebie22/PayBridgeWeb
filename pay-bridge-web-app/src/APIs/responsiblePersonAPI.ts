import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const responsiblePersonApi = createApi({
    reducerPath: "responsiblePersonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7112/api/"
    }),
    tagTypes: ["ResponsiblePeople"],
    endpoints: (builder) => ({
        getResponsiblePeople: builder.query({
            query: () => ({
                url: "ResponsiblePeople/GetResponsiblePeople",
                method: "GET"
            }),
            providesTags: ["ResponsiblePeople"]
        }),
        getResponsiblePersonByUserId: builder.query({
            query: (userId) => ({
                url: "ResponsiblePeople/GetResponsiblePerson",
                method: "GET",
                params: {
                    userId : userId
                }
            }),
            providesTags: ["ResponsiblePeople"]
        }),
        createResponsiblePerson: builder.mutation({
            query: (personBody) => ({
                url: "ResponsiblePeople/CreateResponsiblePerson",
                method: "POST",
                body: personBody
            }),
            invalidatesTags: ["ResponsiblePeople"]
        })
    })
})

export const {useGetResponsiblePeopleQuery, useGetResponsiblePersonByUserIdQuery, useCreateResponsiblePersonMutation} = responsiblePersonApi;
export default responsiblePersonApi;