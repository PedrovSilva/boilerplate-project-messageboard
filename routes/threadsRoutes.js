'use strict';

const express = require("express")
const router = express.Router()
const {Thread} = require("../models/threadModel")
const Board = require("../models/boardModel")

router.route("/api/threads/:board"). post(async(req, res) => {
    const board = await Board.findOne({boardName: req.params.board})

    if(!board){
        const newBoard = {boardName: req.params.board}
        const board = await newBoard.save()
    }
    
})