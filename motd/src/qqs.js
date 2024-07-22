import fs from "fs-extra"
import path from "path"
const DATA_DIR = path.join(process.cwd(), process.env.GSDATA ?? "data")

// Query Service
export default class qqs {

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

         const jsondata = fs.readJSONSync(DATA_DIR + "/quotes.json");

         return {
            model: jsondata.model,
            usage: jsondata.usage,
            cache: await age(DATA_DIR+'/data.json'),
            genai: await age(DATA_DIR+'/quotes.json')
         }

      } catch (error) {
         return { status: 500, data: error.toString() }
      }
   }
}
