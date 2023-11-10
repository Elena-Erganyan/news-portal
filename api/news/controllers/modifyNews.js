const News = require("../../../models/News");
const { DB404Error } = require("../../utils/catchErrors");

const modifyNews = async (req, res) => {
  const id = req.params.id;
  const news = await News.findById(id);
  const user = req.user;

  if (news === null) {
    throw new DB404Error("News doesn't exist");
  }

  const isUserNewsOwner = user._id.equals(news.owner);
  if (!isUserNewsOwner) {
    throw new UnauthorizedError("Only the author can modify this news");
  } 

  // if no errors thrown from the above function then we do the modification

  const modifiedDoc = Object.assign(news, req.body);
  await modifiedDoc.save();
  
  res.status(200).json(modifiedDoc);
};


module.exports = modifyNews;
