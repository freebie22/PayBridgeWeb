import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7112/api/",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "user/register",
                method: "POST",
                body: userData
            }),
        }),
        loginUser: builder.mutation({
            query: (userCredentials) => ({
                url: "user/login",
                method: "POST",
                body : userCredentials
            }),
        }),
        confirmEmailRequest : builder.mutation({
            query: ({userId, email}) => ({
                url: "user/confirmEmailRequest",
                method : "POST",
                body : {
                    userId : userId,
                    email : email
                }
            })
        }),
        confirmEmail : builder.mutation({
            query: (confirmation) => ({
                url: "user/confirmEmail",
                method : "POST",
                body : confirmation,
                headers: {
                    "Content-Type" : "application/json"
                }
            })
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useConfirmEmailRequestMutation, useConfirmEmailMutation } = authApi;
export default authApi;