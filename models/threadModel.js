"use strict";

const mongo = require("mongoose");
const { Replies, repliesSchema } = require("./repliesModel");
const { setPassword, validatePassword } = require("../utils/auth");

const threadSchema = mongo.Schema({
  _id: {
    type: mongo.Schema.Types.ObjectId,
    auto: true,
  },
  board: {
    type: mongo.Schema.Types.ObjectId,
    ref: "Replies",
  },
  delete_password: String,
  text: {
    type: String,
    require: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
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
  replies: [repliesSchema],
});

threadSchema.methods.setPassword = setPassword;

threadSchema.methods.validatePassword = validatePassword;

const Thread = mongo.model("Thread", threadSchema);

module.exports = { Thread: Thread, threadSchema: threadSchema };
