const News = require("../../../models/News");
const { DB404Error, UnauthorizedError } = require("../../utils/catchErrors");

const deleteNews = async (req, res) => {
  const id = req.params.id;
  const news = await News.findById(id);
  if (!news) {
    throw new DB404Error("News id is missing or not found");
  } 

  const user = req.user;
  if (!user._id.equals(news.owner)){
    throw new UnauthorizedError("Only the news author can delete it");
  }

  user.newsHistory = user.newsHistory.filter(newsId => !newsId.equals(id));
  await user.save();
  
  await news.deleteOne();

  res.status(200).json({ message: "News was deleted succefully" });
}

module.exports = deleteNews;
