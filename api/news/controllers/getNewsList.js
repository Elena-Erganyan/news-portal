const News = require("../../../models/News");


const getNewsList = async (req, res)=> {
  // based on a common field (owner for example) or showing all the newsList if query is not passed
  // showing news from the newest to the oldest
  const news = await News.find(req.query, null, {sort: {publishDate: -1}}).lean();
  
  res.status(200).json(news);
}

module.exports = getNewsList;
