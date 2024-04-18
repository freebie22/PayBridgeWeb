import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bankApi = createApi({
    reducerPath : "Bank",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://localhost:7112/api/"
    }),
    endpoints: (builder) => ({
        getBanks : builder.query({
            query: () => ({
                url: "bank/GetBanks",
                method: "GET"
            })
        }),
        getBankById : builder.query({
            query: (bankId) => ({
                url: `bank/GetBank/${bankId}`,
                method: "GET"
            })
        }),
    })
})

export const {useGetBanksQuery, useGetBankByIdQuery} = bankApi;
export default bankApi;