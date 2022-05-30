const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  discordTag: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
  comments: {
    type: [String],
  },
});

const Postdb = mongoose.model("postdb", postSchema);

module.exports = Postdb;
