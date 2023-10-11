const fs = require("fs")

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`))

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
  fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users), (err) => {
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

  fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users), (err) => {
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

  fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users), (err) => {
    res.status(200).json({
      status: "success",
      message: "success delete data",
      data: null,
    })
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
