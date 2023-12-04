const express = require("express")
const cors = require("cors")
const sequelize = require('./db/connect');
const checkAuth = require("./middleware/auth")
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const categoryRouter = require("./routes/category")
const boardRouter = require("./routes/board")
const projectRouter = require("./routes/project")
const taskRouter = require("./routes/task")
const noteRouter = require("./routes/note")
require("dotenv").config()
const app = express()
const port = process.env.PORT || 8000
var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(express.json())
app.use(cors(options))

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/categories", checkAuth, categoryRouter)
app.use("/api/projects", checkAuth, projectRouter)
app.use("/api/boards", checkAuth, boardRouter)
//notes and tasks nested under boards, doesn't make sense to access individually

const serve = async () => {
    try {
        sequelize.authenticate()
        app.listen(port, () => {
            console.log(`App up and listening on port ${port}`)
        })
    }
    catch(error)
    {
        console.log("Failed to authenticate")
        console.log(error)
    }
}

serve()