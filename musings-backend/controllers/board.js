const {StatusCodes} = require("http-status-codes")
const { Board } = require("../models")

const getBoards = async (req, res) => {
    //gets all boards, does not filter by category/project
    const userID = req.user.id;
    try{
        const boards = await Board.findAll({where : {userID : userID}})
        res.status(StatusCodes.OK).json({boards : boards})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : 'The boards could not be fetched'})
    }
}
const getBoard = async (req, res) => {
    const owner = req.user.id
    const boardID = req.params.boardID
    const board = await Board.findOne({where : {userID : owner, boardID : boardID}})
    if(!board) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The board could not be found'})
    }
    res.status(StatusCodes.OK).json({board : board})
}
const createBoard = async (req, res) => {
    //associated projectID is expected in body
    req.body.userID = req.user.id
    try {
        const board = await Board.create(req.body)
        res.status(StatusCodes.CREATED).json({board : board})
    } catch(error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg : "The format is bad."})
    }   
}
const editBoard = async (req, res) => {
    const owner = req.user.id
    const boardID = req.params.boardID
    const board = await Board.update({title : req.body.title} ,{where : {userID : owner, boardID : boardID}})
    if(!board) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The board could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Updated board successfully", board : board})
}
const deleteBoard = async (req, res) => {
    const owner = req.user.id
    const boardID = req.params.boardID
    const board = await Board.destroy({where : {userID : owner, boardID : boardID}})
    if(!board) {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'The board could not be found, or you dont have permissions'})
    }
    res.status(StatusCodes.OK).json({msg : "Deleted board successfully", board : board})
}

module.exports = {
    getBoard,
    getBoards,
    createBoard,
    editBoard,
    deleteBoard
}