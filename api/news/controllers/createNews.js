const News = require("../../../models/News");
const publishNews = require("../../schedule/publishNews");

const createNews = async (req, res) => {
  const user = req.user;
  req.body.owner = user._id;

  const news = await News.create(req.body);

  user.newsHistory = [...user.newsHistory, news._id];
  await user.save();

  if (req.body.publishImmediately === "true") {
    news.published = true;
    await news.save();
  } else {
    await publishNews(news, req.body.datetime);
  }
  
  res.status(201).json(news);
}

module.exports = createNews;
