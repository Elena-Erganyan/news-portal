const News = require("../../../models/News");
const schedule = require("node-schedule");

const createNews = async (req, res) => {
  const user = req.user;
  req.body.owner = user._id;

  const news = await News.create(req.body);

  user.newsHistory = [...user.newsHistory, news._id];
  await user.save();

  if (news.publishDate) {
    const datetime = new Date(news.publishDate);

    schedule.scheduleJob(datetime, async function(){
      news.published = true;
      await news.save();
    });
  } else {
    news.published = true;
    await news.save();
  }
  
  res.status(201).json(news);
}

module.exports = createNews;
