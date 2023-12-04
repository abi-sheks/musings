const { DataTypes } = require("sequelize")
const sequelize = require("../db/connect")


const Task = sequelize.define("Task", {
    taskID : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        default: "New task"
    }
})


module.exports = Task