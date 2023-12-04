//nested under tasks router

const express = require('express')
const router = express.Router()

const {getNotes, getNote, createNote, deleteNote, editNote} = require("../controllers/note")

router.route("/").get(getNotes).post(createNote)
router.route("/:noteID").get(getNote).delete(deleteNote).put(editNote)

module.exports = router