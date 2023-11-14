const News = require("../../../models/News");
const { DB404Error } = require("../../utils/catchErrors");
const schedule = require("node-schedule");

const modifyNews = async (req, res) => {
  const id = req.params.id;
  const news = await News.findById(id);
  const user = req.user;

  if (news === null) {
    throw new DB404Error("Такой новости не существует");
  }

  const isUserNewsOwner = user._id.equals(news.owner);
  if (!isUserNewsOwner) {
    throw new UnauthorizedError("Только автор новости может её редактировать");
  } 

  if (req.body.publishDate && news.publishDate.toISOString() !== req.body.publishDate) {
    schedule.rescheduleJob(id, new Date(req.body.publishDate));
  }

  // if no errors thrown from the above function then we do the modification

  const modifiedDoc = Object.assign(news, req.body);
  await modifiedDoc.save();
  
  res.status(200).json({modifiedDoc, message: "Новость успешно отредактирована"});
};


module.exports = modifyNews;
