const mongoose = require("mongoose")
const app = require("./app")

const port = process.env.port || 3000

const database = "mongodb://localhost:27017/fsw2-tours"

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => err.message)

app.listen(port, () => {
  User = (req, res) => {}
  console.log(`App running on port ${port}...`)
})
