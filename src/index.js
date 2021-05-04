const express = require('express')
require('./db/mongoose')
const Task = require('./db/models/task')
const User = require('./db/models/user')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})