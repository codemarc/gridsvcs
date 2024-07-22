import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import qqs  from "./qqs.js"

export function server() {
   const app = express()
   const PORT = process.env.GS_PORT ?? 3000

   app.use(bodyParser.json())
   app.use(cors())

   // Instantiate the query service
   const qq = new qqs()

   // Read all items using CQRS pattern
   app.get("/v1/motd/quotes", async (req, res) => {
      const returnMeta = req.query.hasOwnProperty("meta")
      const result = (returnMeta) ? await qq.getQuotesMeta() : await qq.getAllQuotes()
      res.status(result.status).send(result.data)
   })


   // Start the server
   app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
      console.log(`Try http://localhost:${PORT}/v1/motd/quotes`)
      console.log(`or  http://localhost:${PORT}/v1/motd/quotes?meta`)
      console.log(`Press CTRL+C to stop`)
   })
}