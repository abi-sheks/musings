const express = require('express')
const router = express.Router()
//nested under boards router

const noteRouter = require("./note")

const {getTasks, getTask, createTask, deleteTask, editTask} = require("../controllers/task")

router.use("/:taskID/notes", noteRouter)
router.route("/").get(getTasks).post(createTask)
router.route("/:taskID").get(getTask).delete(deleteTask).put(editTask)

module.exports = router