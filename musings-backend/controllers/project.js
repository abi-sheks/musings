const {StatusCodes} = require("http-status-codes")
const { Project } = require("../models")

const getProjects = async (req, res) => {
    //gets all projects, does not filter by category
    const userID = req.user.id;
    try{
        const projects = await Project.findAll({where : {userID : userID}})
        console.log(`Returning ${projects}`)
        res.status(StatusCodes.OK).json({projects : projects})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : 'The projects could not be fetched'})
    }
}
const getProject = async (req, res) => {
    const owner = req.user.id
    const projectID = req.params.projectID
    const project = await Project.findOne({where : {userID : owner, projectID : projectID}})
    if(!project) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The project could not be found'})
    }
    res.status(StatusCodes.OK).json({project : project})
}
const createProject = async (req, res) => {
    //associated categoryID is expected in body
    req.body.userID = req.user.id
    try {
        const project = await Project.create(req.body)
        res.status(StatusCodes.CREATED).json({project : project})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg : "The format is bad."})
    }   
}
const editProject = async (req, res) => {
    const owner = req.user.id
    const projectID = req.params.projectID
    const project = await Project.update({title : req.body.title} ,{where : {userID : owner, projectID : projectID}})
    if(!project) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The project could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Deleted project successfully", project : project})
}
const deleteProject = async (req, res) => {
    const owner = req.user.id
    const projectID = req.params.projectID
    const project = await Project.destroy({where : {userID : owner, projectID : projectID}})
    if(!project) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The project could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Deleted project successfully", project : project})
}

module.exports = {
    getProject,
    getProjects,
    createProject,
    editProject,
    deleteProject
}