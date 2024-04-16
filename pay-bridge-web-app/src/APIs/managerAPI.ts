import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const managerApi = createApi({
    reducerPath: "managerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7112/api/"
    }),
    tagTypes: ["Managers"],
    endpoints: (builder) => ({
        getManagers: builder.query({
            query: () => ({
                url: "manager/getManagers",
                method: "GET"
            }),
            providesTags: ["Managers"]
        }),
        getManagerById : builder.query({
            query: (id) => ({
                url: `manager/getManager/${id}`,
                method: "GET"
            }),
            providesTags: ["Managers"]
        })
    })
});

export const {useGetManagersQuery, useGetManagerByIdQuery} = managerApi;
export default managerApi;