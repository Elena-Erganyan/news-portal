import { api } from "../api";


export const deleteNewsItemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteNewsItem: builder.mutation({
      query: (toBeDeletedNewsItem)=> ({
        url: `news/${toBeDeletedNewsItem._id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg)=> [
        { type: "News", id: `List_published=${arg.published}` },
        { type: "News", id: `List_owner=${arg.owner}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useDeleteNewsItemMutation } = deleteNewsItemApi;
