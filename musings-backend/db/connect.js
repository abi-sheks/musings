const { Sequelize } = require('sequelize');
require("dotenv").config()


const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            ca: process.env.POSTGRES_CA
        }
    }
})

module.exports = sequelize