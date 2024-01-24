import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import { routerList } from './routes/route.js'
import { LOGGER, logType } from './utils/loggerUtil.js'
import db from './config/Database.js'
import { v4 } from 'uuid'

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "*"
}))
dotenv.config()

const PORT = process.env.PORT
const DATABASE_SYNC = process.env.DATABASE_SYNC


if (DATABASE_SYNC == "true") {
    db.sync()
}

app.use((req, res, next) => {
    let genUUID = v4()
    req.id = genUUID
    res.setHeader("request-id", genUUID)
    next()
})

routerList.map(route => {
    app.use(route.prefix, route.controller)
})

app.listen(PORT, () => {
    LOGGER(logType.INFO, "SEKOLAH API RUNNING ON " + PORT)
})