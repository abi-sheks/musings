const {StatusCodes} = require("http-status-codes")
const { Task } = require("../models")

//frontend need is for tasks per board and tasks per 
//tasks per board

const getTasks = async (req, res) => {
    //gets tasks specific to board (for efficiency)
    const userID = req.user.id;
    try{
        const tasks = await Task.findAll({where : {userID : userID}})
        res.status(StatusCodes.OK).json({tasks : tasks})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : 'The tasks could not be fetched'})
    }
}

const getTask = async (req, res) => {
    const owner = req.user.id
    const taskID = req.params.taskID
    const task = await Task.findOne({where : {userID : owner, taskID : taskID}})
    if(!task) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The task could not be found'})
    }
    res.status(StatusCodes.OK).json({task : task})
}
const createTask = async (req, res) => {
    req.body.userID = req.user.id
    //need projectID and boardID as well, given through body
    try {
        const task = await Task.create(req.body)
        res.status(StatusCodes.CREATED).json({task : task})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg : "The format is bad."})
    }   
}
const editTask = async (req, res) => {
    const owner = req.user.id
    const taskID = req.params.taskID
    const task = await Task.update({title : req.body.title, completed : req.body.completed} ,{where : {userID : owner, taskID : taskID}})
    if(!task) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The task could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Updated task successfully", task : task})
}
const deleteTask = async (req, res) => {
    const owner = req.user.id
    const taskID = req.params.taskID
    const task = await Task.destroy({where : {userID : owner, taskID : taskID}})
    if(!task) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The task could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Deleted task successfully", task : task})
}

module.exports = {
    getTask,
    getTasks,
    createTask,
    editTask,
    deleteTask
}