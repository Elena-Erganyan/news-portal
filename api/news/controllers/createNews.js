const News = require("../../../models/News");
const schedule = require("node-schedule");

const createNews = async (req, res) => {
  const user = req.user;
  req.body.owner = user._id;

  const news = await News.create(req.body);

  if (req.body.publishDate) {
    const datetime = new Date(req.body.publishDate);

    schedule.scheduleJob(news.id, datetime, async function(){
      news.published = true;
      await news.save();
    });
  } else {
    news.published = true;
    await news.save();
  }
  
  res.status(201).json({news, message: "Новость успешно создана"});
}

module.exports = createNews;
