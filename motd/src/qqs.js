import fs from "fs-extra"
import logger from "./logger.js";
import path from "path"

const DATA_DIR = path.join(process.cwd(), process.env.GSDATA ?? "data")

// Query Service
export default class qqs {
   constructor() {
      this.init()
   }

   async init() {
      try {
         logger.info(`data directory set to ${DATA_DIR}`)
         await fs.ensureDir(DATA_DIR)
         await fs.ensureFile(DATA_DIR + "/data.json")
      } catch (error) {
         logger.error(error.toString())
      }
   }

   async getAllQuotes() {
      try {
         const data = await fs.readJSONSync(DATA_DIR + "/data.json")
         if (data.length == 0) {
            return { status: 404, data: "No quotes found" }
         } else {
            return { status: 200, data: data }
         }
      } catch (error) {
         return { status: 500, data: error.toString() }
      }
   }

   async getQuotesByTopic(topic) {
      try {
         const data = await fs.readJSONSync(DATA_DIR + `/${topic}.data.json`)
         if (data.length == 0) {
            return { status: 404, data: "No quotes found" }
         } else {
            return { status: 200, data: data }
         }
      } catch (error) {
         return { status: 500, data: error.toString() }
      }
   }

   async getTopics() {
      try {
         const data = await fs.readJSONSync(DATA_DIR + "/topics.json")
         if (data.length == 0) {
            return { status: 404, data: "No topics found" }
         } else {
            return { status: 200, data: data }
         }
      } catch (error) {
         return { status: 500, data: error.toString() }
      }
   }

   async getQuotesMeta() {
      try {
         const data = await this.getFileAge()
         if (data.length == 0) {
            return { status: 404, data: "No quotes found" }
         } else {
            return { status: 200, data: data }
         }
      } catch (error) {
         return { status: 500, data: error.toString() }
      }
   }

   async getFileAge() {
      try {

         const age = async (fn) => {
            const stats = await fs.stat(fn)
            const lastModified = stats.mtime
            const now = new Date()
            const ageInMilliseconds = now - lastModified
            const ageInSeconds = Math.floor(ageInMilliseconds / 1000)
            const ageInMinutes = Math.floor(ageInSeconds / 60)
            const ageInHours = Math.floor(ageInMinutes / 60)
            const ageInDays = Math.floor(ageInHours / 24)
            return `${ageInDays} days, ${ageInHours % 24} hours, ${ageInMinutes % 60} minutes, and ${ageInSeconds % 60} seconds.`
         }

         const jsondata = fs.readJSONSync(DATA_DIR + "/quotes.json")
         const data = await fs.readJSONSync(DATA_DIR + "/data.json")

         return {
            model: jsondata.model,
            usage: jsondata.usage,
            count: data.length,
            cache: await age(DATA_DIR+'/data.json'),
            genai: await age(DATA_DIR+'/quotes.json')
         }

      } catch (error) {
         return { status: 500, data: error.toString() }
      }
   }
}
