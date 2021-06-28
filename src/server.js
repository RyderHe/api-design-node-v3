import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Custom middleware
const log = (req, res, next) => {
    console.log("logging")
    req.mydata = "123"
    next()
}

// app.get("/", (req, res) => {
//     res.send({ message: "hello"})
// })

// app.post("/", (req, res) => {
//     console.log(req.body)
//     res.send({message: "ok"})
// })

// pass log midleware to route
app.get("/data", log, (req, res) => {

    res.send({ message: req.mydata })
})

// pass array of middlewares to route
app.post("/data", [log, log, log], (req, res) => {
    res.send(req.body)
})

export const start = () => {
    app.listen(3000, () => {
        console.log("server is on 3000")
    })
}
