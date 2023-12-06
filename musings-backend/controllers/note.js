const {StatusCodes} = require("http-status-codes")
const { Note } = require("../models")

const getNotes = async (req, res) => {
    //gets Notes specific to board (for efficiency)
    const userID = req.user.id;
    try{
        const notes = await Note.findAll({where : {userID : userID}})
        res.status(StatusCodes.OK).json({notes : notes})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : 'The notes could not be fetched'})
    }
}
const getNote = async (req, res) => {
    const owner = req.user.id
    const noteID = req.params.noteID
    const note = await Note.findOne({where : {userID : owner, noteID : noteID}})
    if(!note) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The note could not be found'})
    }
    res.status(StatusCodes.OK).json({note : note})
}
const createNote = async (req, res) => {
    req.body.userID = req.user.id
    try {
        const note = await Note.create(req.body)
        res.status(StatusCodes.CREATED).json({note : note})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg : "The format is bad."})
    }   
}
const editNote = async (req, res) => {
    const owner = req.user.id
    const noteID = req.params.noteID
    const note = await Note.update({title : req.body.title} ,{where : {userID : owner, noteID : noteID}})
    if(!note) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The note could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Updated note successfully", note : note})
}
const deleteNote = async (req, res) => {
    const owner = req.user.id
    const noteID = req.params.noteID
    const note = await Note.destroy({where : {userID : owner, noteID : noteID}})
    if(!note) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The note could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Deleted note successfully", note : note})
}

module.exports = {
    getNote,
    getNotes,
    createNote,
    editNote,
    deleteNote
}