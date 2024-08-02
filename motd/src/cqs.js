import OpenAI from "openai"
import fs from "fs-extra"
import path from "path"
import logger from "./logger.js"
import _ from "lodash"

const DATA_DIR = path.join(process.cwd(), process.env.GSDATA ?? "data")
const QUOTES_FILE = DATA_DIR + "/quotes.json"
const DATA_FILE = DATA_DIR + "/data.json"
const TOPICS_FILE = DATA_DIR + "/topics.json"

export default class cqs {

   async refreshQuotes(force = false, topic="") {
      const quotesFile = (topic.length) ? DATA_DIR + `/${topic}.quotes.json` : QUOTES_FILE
      const dataFile = (topic.length) ? DATA_DIR + `/${topic}.data.json` : DATA_FILE

      try {
         if (force || !fs.existsSync(quotesFile)) {
            await this.fetchNewQuotes(topic)

         } else {
            const fileStats = await fs.stat(quotesFile)
            const fileAgeDays = Math.floor((Date.now() - fileStats.mtime.getTime()) / (1000 * 60 * 60 * 24))
            logger.info(`quotes file age is ${fileAgeDays} days`)

            if (fileAgeDays > 30) {
               await this.fetchNewQuotes(topic)
            }
         }

         const jsondata = fs.readJSONSync(quotesFile)
         try {
            const quotes = JSON.parse(jsondata.choices[0].message.content)
            fs.writeJSONSync(dataFile, quotes, { spaces: 3 })
            return 0

         } catch (err) {
            let messages = '' + jsondata.choices[0].message.content
            const qlist = '[' + messages.split('[')[1].split(']')[0] + ']'
            const quotes = JSON.parse(qlist)
            fs.writeJSONSync(dataFile, quotes, { spaces: 3 })
            return 0
         }

      } catch (err) {
         console.error(err)
         return 1
      }
   }

   async fetchNewQuotes(topic = "") {

      let tprompt=""
      if(topic.length) {
         let topics = fs.readJSONSync(TOPICS_FILE)
         let ttopic = _.find(topics, (t) => {
            if(t.topic == topic) {
               return t
            }
         })
         if(!ttopic) {
            logger.error(`topic ${topic} not found`)
            return
         }
         tprompt=ttopic.prompt
         logger.info(`fetching new quotes ${tprompt}`)
      } else {
         logger.info(`fetching new quotes`)
      }

      const quotesFile = (topic.length) ? DATA_DIR + `/${topic}.quotes.json` : QUOTES_FILE

      // model: "gpt-3.5-turbo",
      // model: "gpt-4o-mini",
      const model = "gpt-4o-mini"
      logger.info(`fetching new quotes using model ${model}`)

      const prompt = `create a list of 50 "message of the day" quotes ${tprompt??""} formatted as an array of json objects containing the fields message and author`
      logger.info(`fetching new quotes using prompt ${prompt}`)

      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      const response = await openai.chat.completions.create({
         model: model,
         messages: [
            {
               role: "user",
               content: [{type: "text",text: prompt,}]
            },
         ],
         max_tokens: 2000,
      })
      fs.writeJSONSync(quotesFile, response, { spaces: 3 })
   }

}
