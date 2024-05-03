"use strict";

const mongo = require("mongoose");
const { setPassword, validatePassword } = require("../utils/auth");
const {Thread} = require("./threadModel")

const repliesSchema = new mongo.Schema(
  {
    _id: {
      type: mongo.Schema.Types.ObjectId,
      auto: true,
    },
    text: {
      type: String,
      require: true,
    },
    created_on: {
      type: Date,
      default: Date.now,
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
  },
  { getters: true }
);

repliesSchema.methods.setPassword = setPassword;
repliesSchema.methods.validatePassword = validatePassword;

const Replies = mongo.model("Replies", repliesSchema);

module.exports = { Replies: Replies, repliesSchema: repliesSchema };
