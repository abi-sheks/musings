const { DataTypes } = require("sequelize")
const sequelize = require("../db/connect")

const Category = sequelize.define("Category", {
    categoryID : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        default: "New category"
    }
})

module.exports = Category
