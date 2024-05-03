const mongo = require("mongoose");
const { threadSchema } = require("./threadModel");

const boardSchema = mongo.Schema({
  _id: {
    type: mongo.Schema.Types.ObjectId,
    auto: true,
  },
  boardName: {
    type: String,
    require: true,
  },
  threads: [threadSchema],
});

const Board = mongo.model("Board", boardSchema);

module.exports = Board;
