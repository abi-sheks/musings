const { DataTypes } = require("sequelize")
const sequelize = require("../db/connect")


const Board = sequelize.define("Board", {
    boardID : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        default: "New board"
    }
})


module.exports = Board