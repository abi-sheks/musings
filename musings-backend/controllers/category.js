const {StatusCodes} = require("http-status-codes")
const { Category } = require("../models")

const getCategories = async (req, res) => {
    try{
        console.log(req.user.id)
        const categories = await Category.findAll({where : {userID : req.user.id}})
        console.log(`returning ${categories}`)
        res.status(StatusCodes.OK).json({categories : categories})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : 'The categories could not be fetched'})
    }
}
const createCategory = async (req, res) => {
    console.log(req.body)
    req.body.userID = req.user.id
    console.log(`Received body is ${req.body.title}`)
    try {
        const category = await Category.create(req.body)
        res.status(StatusCodes.CREATED).json({category : category})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg : "The format is bad."})
    }     
}
const getCategory = async (req, res) => {
    const owner = req.user.id
    const categoryID = req.params.categoryID
    const category = await Category.findOne({where : {userID : owner, categoryID : categoryID}})
    if(!category) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The category could not be found'})
    }
    res.status(StatusCodes.OK).json({category : category})
}

const deleteCategory = async (req, res) => {
    const owner = req.user.id
    const categoryID = req.params.categoryID
    const category = await Category.destroy({where : {userID : owner, categoryID : categoryID}})
    if(!category) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The category could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Deleted message successfully", category : category})
}
const editCategory = async (req, res) => {
    const owner = req.user.id
    const categoryID = req.params.categoryID
    const category = await Category.update({title : req.body.title} ,{where : {userID : owner, categoryID : categoryID}})
    if(!category) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The category could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Deleted message successfully", category : category})
}

module.exports = {
    createCategory,
    deleteCategory,
    getCategory,
    getCategories,
    editCategory
}