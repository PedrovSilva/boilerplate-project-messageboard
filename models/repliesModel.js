const mongo = require("mongoose");

const repliesSchema = new mongo.Schema({
  _id: {
    type: mongo.Schema.Types.ObjectId,
    auto: true,
  },
  text: {
    type: String,
    require: true,
  },
  created_on: {
    type: Date.now,
    require: true,
  },
  delete_password: {
    type: String,
    require: true,
  },
  reported: {
    type: Boolean,
    default: false,
    require: true,
  },
});

const Replies = mongo.model("Replies", repliesSchema);

module.exports = { Replies: Replies, repliesSchema: repliesSchema };
