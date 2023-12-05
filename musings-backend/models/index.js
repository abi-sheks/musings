//required to solve circular dependencies
//good practice to re export anyway

const sequelize = require('../db/connect')
const User = require('./User')
const Category = require('./Category');
const Project = require("./Project");
const Board = require("./Board");
const Task = require("./Task");
const Note = require("./Note");



//User-Category
User.hasMany(Category, {
    as : "owner",
    foreignKey : "userID"
});
Category.belongsTo(User);

//Category/User-Project
Category.hasMany(Project, {
    as : "parent_category",
    foreignKey : "categoryID"
});
Project.belongsTo(Category)
User.hasMany(Project, {
    as : "parent_user",
    foreignKey : "userID"
});
Project.belongsTo(User)


//Project/User-Board
Project.hasMany(Board, {
    as : "parent_project",
    foreignKey : "projectID"
});
Board.belongsTo(Project)
User.hasMany(Board, {
    foreignKey : "userID"
});
Board.belongsTo(User)

//Board/User/Project-Task
Board.hasMany(Task, {
    as : "parent_board",
    foreignKey : "boardID"
});
Task.belongsTo(Board)
Project.hasMany(Task, {
    as : "parent_proj",
    foreignKey : "projectID"
});
Task.belongsTo(Project)
User.hasMany(Task, {
    foreignKey : "userID"
});
Task.belongsTo(User)

//Task/User-Note
Task.hasMany(Note, {
    as : "parent_task",
    foreignKey : "taskID"
});
Note.belongsTo(Task)
User.hasMany(Note, {
    foreignKey : "userID"
});
Note.belongsTo(User)

sequelize.sync({force: false}).then(function () {
    console.log("Database Configured");
});
module.exports = {User, Category, Project, Board, Task, Note};