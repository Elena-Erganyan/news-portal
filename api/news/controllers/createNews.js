const News = require("../../../models/News");

const createNews = async (req, res) => {
  const user = req.user;
  req.body.owner = user._id;

  const news = await News.create(req.body);

  user.newsHistory = [...user.newsHistory, news._id];
  await user.save();
  
  res.status(201).json(news);
}

module.exports = createNews;