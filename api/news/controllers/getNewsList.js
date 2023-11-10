const News = require("../../../models/News");
const { BadReqError } = require("../../utils/catchErrors");

const getNewsList = async (req, res)=> {
  //based on a common field (owner)
  const query = req.query;

  if (Object.keys(query).length === 0) {
    throw new BadReqError("No query was passed");
  }

  const news = await News.find(query).lean();
  
  res.status(200).json(news);
}

module.exports = getNewsList;
