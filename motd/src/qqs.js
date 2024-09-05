import fs from "fs-extra"
import logger from "./logger.js";
import path from "path"
import { createClient } from "@supabase/supabase-js"

const DATA_DIR = path.join(process.cwd(), process.env.GS_DATA ?? "data")

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

   async getTopics(cache) {
      const getTopicsFromSupabase = async () => {
         try {
            const supabase = createClient(process.env.GS_SUPAURL ?? "", process.env.GS_SUPAPUBLIC ?? "")
            const { data, error } = await supabase.from('topics').select('topic,prompt')
            if (error) {
               throw error
            } else {
               return { status: 200, data: data }
            }
         } catch (err) {
            const errmsg = err.hasOwnProperty('message') ? err.message : err.toString()
            logger.error(errmsg)
            return { status: 500, data: errmsg }
         }
      }

      try {
         const cacheFileName = path.join(DATA_DIR, 'topics.json')

         // Step 1: Check if cache parameter is set to false
         if (cache === 'false') {
            logger.info(`cache parameter is set to false, fetching topics from Supabase`)
            const rc = await getTopicsFromSupabase()
            if (rc.status !== 200) {
               return rc
            } else {
               logger.info(`topics cache created/updated`)
               fs.writeJSONSync(cacheFileName, rc.data, { spaces: 2 })
               return rc
            }
         }

         // Step 2: Check if topics.json exists
         if (!fs.existsSync(cacheFileName)) {
            logger.info(`topics cache does not exist, fetching topics from Supabase`)
            const rc = await getTopicsFromSupabase()
            if (rc.status !== 200) {
               return rc
            } else {
               logger.info(`topics cache created/updated`)
               fs.writeJSONSync(cacheFileName, rc.data, { spaces: 2 })
               return rc
            }
         }

         // Step 3: Check if the file is older than the TTL
         const stats = await fs.stat(cacheFileName)
         const ageInMilliseconds = new Date() - stats.mtime
         const ageInSeconds = Math.floor(ageInMilliseconds / 1000)
         const ttl = parseInt(process.env.GS_CACHETTL ?? '7200', 10) // Default TTL is 2 hours (7200 seconds)

         if (ageInSeconds > ttl) {
            logger.info(`topics cache is older than TTL, fetching topics from Supabase`)
            const rc = await getTopicsFromSupabase()
            if (rc.status !== 200) {
               return rc
            } else {
               logger.info(`topics cache created/updated`)
               fs.writeJSONSync(cacheFileName, rc.data, { spaces: 2 })
               return rc
            }
         }

         // Step 4: Return the cached topics.json
         const data = fs.readJSONSync(cacheFileName)
         if (data.length === 0) {
            return { status: 404, data: "No topics found" }
         } else {
            return { status: 200, data: data }
         }
      } catch (err) {
         const errmsg = err.hasOwnProperty('message') ? err.message : err.toString()
         logger.error(errmsg)
         return { status: 500, data: errmsg }
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
