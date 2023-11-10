const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Can't be empty"],
    maxLength: [90, "Maximum characters limit of 90 is exceeded"]
  },
  description: {
    type: String,
    required: [true, "Can't be empty"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

module.exports = mongoose.model("News", newsSchema, "News");
