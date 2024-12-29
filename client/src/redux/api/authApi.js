import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/users" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.mutation({
      query: ({ token }) => {
        return {
          url: "/",
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        };
      },
    }),
  }),
});



const { 
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetUserMutation ,
} = authApi;


    
export {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserMutation ,
  authApi,
};
