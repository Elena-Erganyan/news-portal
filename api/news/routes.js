const express = require("express");
const { catchErrors } = require("../utils/catchErrors");
const router = express.Router();

const {
  getNewsList,
  createNews,
  modifyNews,
  deleteNews,
} = require("./controllers");

const auth = require("../../middleware/auth");

// get newsList having a common property/field
router.route("/").get(catchErrors(getNewsList));

// create a news item
router.route("/").post(auth, catchErrors(createNews));

// modify a news item
router.route("/:id").put(auth, catchErrors(modifyNews));

// delete a news item
router.route("/:id").delete(auth, catchErrors(deleteNews));

module.exports = router;