import { api } from "../api";
import { logoutUser, setUser } from "../../userSlice";

export const loginLogoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutUser());
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation } = loginLogoutApi;
