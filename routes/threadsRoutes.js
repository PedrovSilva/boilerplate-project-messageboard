"use strict";

const express = require("express");
const router = express.Router();
const { Thread } = require("../models/threadModel");
const Board = require("../models/boardModel");

router
  .route("/api/threads/:board")
  .post(async (req, res) => {
    const board = await Board.findOne({ boardName: req.params.board });

    try {
      if (!board) {
        const newBoard = new Board({ boardName: req.params.board });
        const board = await newBoard.save();
      }
      const newThread = new Thread({ text: req.body.text });
      newThread.setPassword(req.body.delete_password);

      board.threads.push(newThread);
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  })
  .get(async (req, res) => {
    try {
      const board = await Board.findOne({
        boardName: req.params.board,
      }).populate({
        path: "threads",
        options: { sort: { bumped_on: -1 }, limit: 10 },
        select: "-reported -delete_password",
        populate: {
          path: "replies",
          options: { sort: { created_on: -1 }, limit: 3 },
          select: "-reported -delete_password",
        },
      });
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }

      res.json(board.threads);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const board = await Board.findOne({ boardName: req.params.board });
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }
      const thread = board.threads._id(req.body.thread_id);

      if (thread.validatePassword(req.body.delete_password)) {
        thread.remove();
        await board.save();

        res.json({ success: "Success" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;
