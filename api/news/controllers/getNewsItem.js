const News = require("../../../models/News");


const getNewsItem = async (req, res)=> {
  const news = await News.findById(req.params.id).lean();
  
  res.status(200).json(news);
}

module.exports = getNewsItem;