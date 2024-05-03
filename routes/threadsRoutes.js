"use strict";

const express = require("express");
const router = express.Router();
const { Thread } = require("../models/threadModel");
const Board = require("../models/boardModel");

router.route("/api/threads/:board").post(async (req, res) => {
  const board = await Board.findOne({ boardName: req.params.board });

  try {
    if (!board) {
      const newBoard = new Board({ boardName: req.params.board });
      const board = await newBoard.save();
    }
    const newThread = new Thread({ text: req.body.text });
    newThread.setPassword(req.body.delete_password);

    await newThread.save();
  } catch (err) {
    console.error(err);
  }
});
