const { DataTypes } = require("sequelize")
const sequelize = require("../db/connect")


const Project = sequelize.define("Project", {
    projectID : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        default: "New project"
    }
})

module.exports = Project