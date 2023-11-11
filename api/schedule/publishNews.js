const schedule = require("node-schedule");

const publishNews = async (newsItem, datetimeString) => {
  const datetime = new Date(datetimeString);

  schedule.scheduleJob(datetime, async function(){
    newsItem.published = true;
    await newsItem.save();
  });
};


module.exports = publishNews;
