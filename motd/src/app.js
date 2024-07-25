import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import qqs from "./qqs.js"
import logger from "./logger.js"


export function server() {
   const app = express()
   const PORT = process.env.GSPORT ?? 3000

   // express middleware
   app.use(bodyParser.json())
   app.use(cors())
   app.use(helmet())

   // Instantiate the query service
   const qq = new qqs()

   // Read all items using CQRS pattern
   app.get("/v1/motd/quotes", async (req, res) => {
      const returnMeta = req.query.hasOwnProperty("meta")
      logger.info(`GET /v1/motd/quotes ${returnMeta? "return meta" : ""}`)
      const result = (returnMeta) ? await qq.getQuotesMeta() : await qq.getAllQuotes()
      res.status(result.status).send(result.data)
   })

   // Stop the server
   app.get("/v1/motd/stop", async (req, res) => {
      logger.info("GET /v1/motd/stop")
      res.status(200).send("stopped")
      process.exit(0)
   })


   // Start the server
   app.listen(PORT, () => {
      logger.info(`server is running on http://localhost:${PORT}`)
      logger.info(`try http://localhost:${PORT}/v1/motd/quotes`);
      logger.info(`or  http://localhost:${PORT}/v1/motd/quotes?meta`);
      logger.info(`press CTRL+C to stop`);
   })
}