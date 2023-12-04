const express = require('express')
const router = express.Router()

const {getCategories, getCategory, createCategory, deleteCategory, editCategory} = require("../controllers/category")

router.route("/").get(getCategories).post(createCategory)
router.route("/:categoryID").get(getCategory).delete(deleteCategory).put(editCategory)

module.exports = router