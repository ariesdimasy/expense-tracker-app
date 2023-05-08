const express = require("express")
const app = express()

const port = 4567

app.use(express.json())

const routes = require("./routers")
const { route } = require("./routers/expenseRoute")

app.get("/",(req, res) => {
    res.status(200).send({
        message:"success",
        data:[]
    })
})

app.use("/expense",routes.expenseRoute)

app.listen(port,() => {
    console.log("server success listen to port = ", port )
})