import { api } from "../api";

export const activateUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    activateUser: builder.mutation({
      query: ({token}) => ({
        url: `users/activation/${token}`,
        method: "PUT",
      })
    }),
    resendActivation: builder.mutation({
      query: (data) => ({
        url: "users/activation",
        method: "POST",
        body: data,
      })
    }),
  }),
  overrideExisting: false,
});

export const { useActivateUserMutation, useResendActivationMutation } = activateUserApi;
