import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// // cats
// const routes = ["get /cat", "get /cat/:id", "post /cat", "put /cat/:id", "delete /cat/:id"]

// router.route("/cat")
// .get()
// .post()

// router.router("/cat/:id")
// .get()
// .put()
// .delete()

// Router and SubRouters
router.get('/me', (req, res) => {
    console.log('here')
    res.send({ me: 'hello' })
})

app.use("/api", router)

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
app.get("/data", log, (req, res) => { // exact match

    res.send({ message: req.mydata })
})

// pass array of middlewares to route
app.post("/data", [log, log, log], (req, res) => { // exact match
    res.send(req.body)
})

app.get("/user/*", (req, res) => {
    res.send("glob")
})

app.get("/:id", (req, res) => {
    res.send("parameter")
})

export const start = () => {
    app.listen(3000, () => {
        console.log("server is on 3000")
    })
}
