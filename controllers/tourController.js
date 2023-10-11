const fs = require("fs")

const Tour = require("../models/tours_models")
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// check by id
const checkId = (req, res, next, val) => {
  const tour = tours.find((el) => el.id === val * 1)
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${val} this not found`,
    })
  }
  next()
}

// TOURS MODEL
const getAllToursModel = async (req, res) => {
  try {
    const tours = await Tour.find()
    console.log(tours)
    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getTourModel = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const updateTourModel = async (req, res) => {
  try {
    const id = req.params.id
    const updateTour = await Tour.findByIdAndUpdate(id, req.body, { new: true })
    if (updateTour === -1) {
      return res.status(400).json({
        status: "failed",
        message: `id : ${id} not found`,
      })
    }
    res.status(201).json({
      status: "success",
      message: "successfully updated",
      data: {
        tour: updateTour,
      },
    })
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    })
  }
}

const createTourModel = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const deleteTourModel = async (req, res) => {
  try {
    const id = req.params.id
    const deleteTour = await Tour.findByIdAndDelete(id)
    if (!deleteTour) {
      return res.status(404).json({
        status: "failed",
        message: `id : ${id} not found`,
      })
    }

    res.status(200).json({
      status: "success",
      message: "successfully deleted",
      data: null,
    })
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    })
  }
}

// TOURS API
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
  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
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

  //   if (tourIndex === -1) {
  //     return res.status(404).json({
  //       status: "failed",
  //       message: `data with ${id} this not found`,
  //     })
  //   }

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  }

  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
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

  //   const tourIndex = tours.findIndex((el) => el.id === id)
  //   if (tourIndex === -1) {
  //     return res.status(404).json({
  //       status: "failed",
  //       message: `index ${id} not found`,
  //     })
  //   }

  tours.splice(tourIndex, 1)
  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(200).json({
      status: "succes",
      message: "success delete data",
      data: null,
    })
  })
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  checkId,
  createTourModel,
  getAllToursModel,
  getTourModel,
  updateTourModel,
  deleteTourModel,
}
