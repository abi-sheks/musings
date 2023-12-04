const express = require("express")
const router = express.Router()

const {getProjects, getProject, createProject, editProject, deleteProject} = require("../controllers/project")

router.route("/").get(getProjects).post(createProject)
router.route("/:projectID").get(getProject).put(editProject).delete(deleteProject)


module.exports = router