const { DataTypes } = require("sequelize")
const sequelize = require("../db/connect")


const Note = sequelize.define("Note", {
    noteID : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        default: "New note"
    }
})


module.exports = Note