const { Sequelize, Model, DataTypes } = require("sequelize")
const Category = require("./Category")
const sequelize = require("../db/connect")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const User = sequelize.define("User", {
    userID : {
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(10);
            this.setDataValue('password', bcrypt.hashSync(value, salt))
        }
    }
})

//more mongoose schema-esque syntax
User.prototype.createJWT = function () {
    return jwt.sign({id : this.userID, username : this.username}, process.env.TOKEN_SECRET)
}
User.prototype.comparePassword = async function(incomingPassword) {
    const isValid = await bcrypt.compare(incomingPassword, this.password)
    return isValid
}


module.exports = User
