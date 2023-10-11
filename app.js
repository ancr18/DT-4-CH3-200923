// core module
const fs = require("fs")

// third party module
const express = require("express")
const morgan = require("morgan")
const app = express()

// local module
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

// middleware express
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(`${__dirname}/public`))

// create middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

// API
app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

module.exports = app
