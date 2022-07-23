import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IRTKQueryResponse, ISignUp } from "../interfaces";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getUserWithAuthToken: builder.query<
      IRTKQueryResponse["data"],
      { authToken: string }
    >({
      query: (body) => ({
        url: `/auth/me`,
        headers: { authorization: `Bearer ${body.authToken}` },
      }),
    }),
    signUp: builder.mutation<IRTKQueryResponse["data"], ISignUp>({
      query: (body) => ({
        url: `/auth/sign-up`,
        method: "POST",
        body,
      }),
    }),
    verifyOTP: builder.query<
      IRTKQueryResponse["data"],
      { email: string; token: string }
    >({
      query: (body) => ({
        url: `/auth/verify-email`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifyOTPQuery,
  useGetUserWithAuthTokenQuery,
} = authApi;
