const mongo = require("mongoose");

const threadSchema = mongo.Schema({
  _id: {
    type: mongo.Schema.Types.ObjectId,
    auto: true,
  },
  delete_password: String,
  text: {
    type: String,
    require: true,
  },
  created_on: {
    type: Date.now,
    require: true,
  },
  bumped_on: {
    type: Date,
    default: Date.now,
  },
  reported: {
    type: Boolean,
    default: false,
    require: true,
  },
  replies: [RepliesSchema],
});

const Thread = mongo.model("Thread", threadSchema);

module.exports = Thread;
