import { api } from "../api";

export const registerUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
      })
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation } = registerUserApi;
