const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name tour required"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [true, "Price tour required"],
  },
})

const Tour = mongoose.model("Tour", tourSchema)

// test create
// const testTour = new Tour({
//   name: "The PaluS",
//   rating: 4.5,
//   price: 20000,
// })

// testTour.save()

module.exports = Tour
