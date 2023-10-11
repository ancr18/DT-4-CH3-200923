// check body
const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      message: "Name or Price are required",
    })
  }
}

exports.module = checkBody
