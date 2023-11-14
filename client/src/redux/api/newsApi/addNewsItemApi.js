import { api } from "../api";


export const addNewsItemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewsItem: builder.mutation({
      query: (data) => ({
        url: "news",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => [
        { type: "News", id: `List_published=${result?.news.published}` },
        { type: "News", id: `List_owner=${result?.news.owner}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useAddNewsItemMutation } = addNewsItemApi;
