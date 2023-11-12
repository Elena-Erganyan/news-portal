import { api } from "../api";
import { setUser } from "../../userSlice";


export const getUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "users/me",
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});


export const { useGetMeQuery } = getUserApi;
