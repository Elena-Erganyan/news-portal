const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Не может быть пустым"],
    maxLength: [90, "Превышен лимит в 90 символов"]
  },
  description: {
    type: String,
    required: [true, "Не может быть пустым"],
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
  publishDate: {
    type: Date,
    default: () => new Date(),
  },
}, {timestamps: true});

module.exports = mongoose.model("News", newsSchema, "News");
