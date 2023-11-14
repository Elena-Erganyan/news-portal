import { api } from "../api";


export const modifyNewsItemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    modifyNewsItem: builder.mutation({
      query: ({id, data}) => ({
        url: `news/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result) => [
        { type: "News", id: `List_published=${result?.modifiedDoc.published}` },
        { type: "News", id: `List_owner=${result?.modifiedDoc.owner}` },
        { type: "News", id: result?.modifiedDoc._id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useModifyNewsItemMutation } = modifyNewsItemApi;
