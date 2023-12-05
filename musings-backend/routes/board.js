const express = require('express')
const router = express.Router()

const {getBoards, getBoard, createBoard, deleteBoard, editBoard} = require("../controllers/board")

router.route("/").get(getBoards).post(createBoard)
router.route("/:boardID").get(getBoard).delete(deleteBoard).put(editBoard)

module.exports = router