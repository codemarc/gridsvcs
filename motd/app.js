const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs-extra")
const path = require("path")

const app = express()
const PORT = process.env.GSPORT ?? 3000
const DATA_FILE = path.join(__dirname, process.env.GSDATA ?? "data.json")

app.use(bodyParser.json())
app.use(cors())

// Read all items
app.get("/v1/motd/quotes", async (req, res) => {
  try {
    const data = await fs.readJson(DATA_FILE)
	if(data.length == 0) {
		res.status(404).send("No quotes found")
	} else {
		res.json(data)
	}
  } catch (error) {
    res.status(500).send(error.toString())
  }
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
