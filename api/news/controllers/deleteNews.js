const News = require("../../../models/News");
const { DB404Error, UnauthorizedError } = require("../../utils/catchErrors");
const schedule = require("node-schedule");

const deleteNews = async (req, res) => {
  const id = req.params.id;
  const news = await News.findById(id);
  if (!news) {
    throw new DB404Error("Идентификатор (id) новости не передан или не найден");
  } 

  const user = req.user;
  if (!user._id.equals(news.owner)){
    throw new UnauthorizedError("Только автор новости может её удалить");
  }

  user.newsHistory = user.newsHistory.filter(newsId => !newsId.equals(id));
  await user.save();
  
  schedule.cancelJob(news.id);
  await news.deleteOne();

  res.status(200).json({ message: "Новость успешно удалена" });
}

module.exports = deleteNews;
