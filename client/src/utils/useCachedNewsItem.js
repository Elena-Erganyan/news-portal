import { getNewsListApi } from "../redux/api/newsApi";


export const useCachedNewsItem = (newsItemId, owner) => {
    
  const { ownNewsItem } = getNewsListApi.endpoints.getNewsByField.useQueryState({ key: "owner", value: owner }, {
    selectFromResult: (result) => ({
      ...result,
      ownNewsItem: result.data?.find((newsItem) => newsItem._id === newsItemId),
    })
  });

  const { newsListItem } = getNewsListApi.endpoints.getNewsByField.useQueryState({ key: "published", value: true }, {
    selectFromResult: (result) => ({
      ...result,
      newsListItem: result.data?.find((newsItem) => newsItem._id === newsItemId),
    })
  });

  const { data: newsItem } = getNewsListApi.endpoints.getNewsItem.useQueryState(newsItemId);

  // subscribe to cached data so it doesn't get thrown away by RTK query
  getNewsListApi.endpoints.getNewsByField.useQuerySubscription({ key: "owner", value: owner }, {skip: !ownNewsItem});
  getNewsListApi.endpoints.getNewsByField.useQuerySubscription({ key: "published", value: true }, {skip: !newsListItem});
  getNewsListApi.endpoints.getNewsItem.useQuerySubscription(newsItemId, {skip: !newsItem});

  return ownNewsItem || newsListItem || newsItem;
};
