import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import fs from "fs-extra"
import qqs from "./qqs.js"
import logger from "./logger.js"
import swaggerSetup from "./swagger.js"

export function server() {
   const app = express()
   const PORT = process.env.GSPORT ?? 3000

   // express middleware
   app.use(bodyParser.json())
   app.use(cors())
   app.use(helmet())

   // Instantiate the query service
   const qq = new qqs()

   // Status and Metrics
   /**
    * @swagger
    * /v1/motd/status:
    *   get:
    *     tags: [motd]
    *     summary: Status and metrics for the motd service
    *     responses:
    *       200:
    *         description: The message of the day service stats
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 version:
    *                   type: string
    *                   example: "0.0.0"
    *                 build:
    *                   type: string
    *                   example: "240801000"
    *                 model:
    *                   type: string
    *                   example: "gpt-4o-mini-2024-07-18"
    *                 usage:
    *                   type: object
    *                   properties:
    *                     prompt_tokens:
    *                       type: integer
    *                       example: 33
    *                     completion_tokens:
    *                       type: integer
    *                       example: 1436
    *                     total_tokens:
    *                       type: integer
    *                       example: 1469
    *                 cache:
    *                   type: string
    *                   example: "0 days, 17 hours, 48 minutes, and 9 seconds."
    *                 genai:
    *                   type: string
    *                   example: "0 days, 18 hours, 36 minutes, and 40 seconds."
    */
   app.get("/v1/motd/status", async (req, res) => {
      let svc = fs.readJSONSync("build.num")
      res.status(200).send(svc)
   })

   // Read all items using CQRS pattern

   /**
    * @swagger
    * components:
    *   schemas:
    *     Quote:
    *       type: object
    *       properties:
    *         message:
    *           type: string
    *           description: The quote message
    *           example: The only way to do great work is to love what you do.
    *         author:
    *           type: string
    *           description: The author of the quote
    *           example: Steve Jobs
    *     QuoteArray:
    *       type: array
    *       items:
    *         $ref: '#/components/schemas/Quote'
    */

   /**
    * @swagger
    * /v1/motd/quotes:
    *   get:
    *     tags: [motd]
    *     summary: Current quotes list
    *     parameters:
    *       - in: query
    *         name: topic
    *         schema:
    *           type: string
    *         description: Optional topic to filter quotes
    *     responses:
    *       200:
    *        description: A list of quotes
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/QuoteArray'
    *       500:
    *         description: Internal server error
    */
   app.get("/v1/motd/quotes", async (req, res) => {
      logger.info(`GET /v1/motd/quotes`)
      const { topic } = req.query
      const result =(topic)?await qq.getQuotesByTopic(topic):await qq.getAllQuotes()
      res.status(result.status).send(result.data)
   })


   /**
    * @swagger
    * components:
    *   schemas:
    *     TopicPrompt:
    *       type: object
    *       properties:
    *         topic:
    *           type: string
    *           description: The topic name
    *           example: Trump
    *         prompt:
    *           type: string
    *           description: The prompt related to the topic
    *           example: related to Donald Trump
    *     TopicPromptArray:
    *       type: array
    *       items:
    *         $ref: '#/components/schemas/TopicPrompt'
    */

   /**
    * @swagger
    * /v1/motd/topics:
    *   get:
    *     tags: [motd]
    *     summary: Retrieve a list of topic prompts
    *     responses:
    *       200:
    *         description: A list of topic prompts
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/TopicPromptArray'
    *       500:
    *         description: Internal server error
    */
   app.get("/v1/motd/topics", async (req, res) => {
      logger.info(`GET /v1/motd/topics`)
      const result = await qq.getTopics()
      res.status(result.status).send(result.data)
   })


   // Stop the server
   app.get("/v1/motd/stop", async (req, res) => {
      logger.info("GET /v1/motd/stop")
      res.status(200).send("stopped")
      process.exit(0)
   })

   swaggerSetup(app)

   // Start the server
   app.listen(PORT, () => {
      logger.info(`server is running on http://localhost:${PORT}`)
      logger.info(`try http://localhost:${PORT}/v1/api-docs`)
      logger.info(`try http://localhost:${PORT}/v1/motd/status`)
      logger.info(`try http://localhost:${PORT}/v1/motd/quotes`)
      logger.info(`try http://localhost:${PORT}/v1/motd/topics`)
      logger.info(`press CTRL+C to stop`)
   })
}