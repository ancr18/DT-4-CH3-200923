const express = require("express")

const tourController = require("../controllers/tourController")

const router = express.Router()

// router.param("id", tourController.checkId)

router.route("/").get(tourController.getAllToursModel).post(tourController.createTour)

router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

router.route("/model").get(tourController.getAllToursModel).post(tourController.createTourModel)

router
  .route("/model/:id")
  .get(tourController.getTourModel)
  .patch(tourController.updateTourModel)
  .delete(tourController.deleteTourModel)

module.exports = router
