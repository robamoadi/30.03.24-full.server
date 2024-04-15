const express = require("express")
const body_parser = require("body-parser")
const config = require("config")
const cors = require("cors")
const pupils_router = require("./routers/pupils_router")

const app = express()

app.use(body_parser.json())

app.use(cors())

app.use('/api/pupils',pupils_router)

app.listen(config.server.port, () => {
    console.log(`== Express server is running on port ${config.server.port} ==`);

})