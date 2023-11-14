import { api } from "../api";


export const getNewsListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNewsByField: builder.query({
      query: ({key, value}) => `news?${key}=${value}`,
      providesTags: (_result, _error, arg) => [{type: "News", id: `List_${arg.key}=${arg.value}`}], 
    }),
    getNewsItem: builder.query({
      query: (id) => `news/${id}`,
      providesTags: (result) => [{type: "News", id: result?._id}], 
    }),
  }),
  overrideExisting: false,
});


export const { useGetNewsByFieldQuery, useGetNewsItemQuery } = getNewsListApi;
