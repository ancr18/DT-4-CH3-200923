const fs = require("fs")
const express = require("express")
const morgan = require("morgan")
const app = express()
const port = process.env.port || 3000
// middleware express
app.use(express.json())
app.use(morgan("dev"))

// create middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

// req by all data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`))

// refactoring codingan

// TOURSE API
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: {
      tours,
    },
  })
}

const getTourById = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  console.log(id)
  console.log(tour)

  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    })
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  })
}

const createTour = (req, res) => {
  // generate id untuk data baru dari req api
  const newId = tours[tours.length - 1].id + 1
  const newData = Object.assign({ id: newId }, req.body)

  tours.push(newData)
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newData,
      },
    })
  })
}

const updateTour = (req, res) => {
  const id = req.params.id * 1
  const tourIndex = tours.findIndex((el) => el.id === id)

  if (tourIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    })
  }

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  }

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(200).json({
      status: "success",
      message: `tour with this id ${id} edited`,
      data: {
        tour: tours[tourIndex],
      },
    })
  })
}

const deleteTour = (req, res) => {
  //  * 1 untuk membuat string ke number
  const id = req.params.id * 1

  const tourIndex = tours.findIndex((el) => el.id === id)
  if (tourIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `index ${id} not found`,
    })
  }

  tours.splice(tourIndex, 1)
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(200).json({
      status: "succes",
      message: "success delete data",
      data: null,
    })
  })
}

// USERS API
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "sucsess",
    requestTime: req.requestTime,
    data: {
      users,
    },
  })
}

const getUserById = (req, res) => {
  // mengambil id
  const id = req.params.id

  // mengambil user satuan dan menyamakan id nya
  const user = users.find((el) => el._id === id)

  // validasi jika tidak ada id nya
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: `User by id ${id} is not found`,
    })
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  })
}

const createUser = (req, res) => {
  const newId = users[users.length - 1]._id + 1
  const newData = Object.assign({ _id: newId }, req.body)

  users.push(newData)
  fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), (err) => {
    res.status(201).json({
      status: "sucsess",
      data: {
        user: newData,
      },
    })
  })
}

const updateUser = (req, res) => {
  const id = req.params.id
  const userIndex = users.findIndex((el) => el._id === id)

  if (userIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    })
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
  }

  fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), (err) => {
    res.status(200).json({
      status: "success",
      message: `tour with this id ${id} edited`,
      data: {
        user: users[userIndex],
      },
    })
  })
}

const deleteUser = (req, res) => {
  const id = req.params.id
  const userIndex = users.findIndex((el) => el._id === id)

  console.log(typeof id)
  if (userIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    })
  }

  users.splice(userIndex, 1)

  fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), (err) => {
    res.status(200).json({
      status: "success",
      message: "success delete data",
      data: null,
    })
  })
}

// routing yang lebih cekep / refactoring

const tourRouter = express.Router()
const userRouter = express.Router()

tourRouter.route("/").get(getAllTours).post(createTour)
tourRouter.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour)
userRouter.route("/").get(getAllUsers).post(createUser)
userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser)

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

app.listen(port, () => {
  User = (req, res) => {}
  console.log(`App running on port ${port}...
  `)
})
