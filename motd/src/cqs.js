import OpenAI from "openai"
import fs from "fs-extra"
import path from "path"
const DATA_DIR = path.join(process.cwd(), process.env.GSDATA ?? "data")

export default class cqs {

   async refreshQuotes(force = false) {
      try {
         const QUOTES_FILE = DATA_DIR + "/quotes.json"
         const fileStats = await fs.stat(QUOTES_FILE)
         const fileAgeDays = (Date.now() - fileStats.mtime.getTime()) / (1000 * 60 * 60 * 24)

         if (force || fileAgeDays > 30) {
            await this.fetcshNewQuotes() // Ensure this method is properly implemented to fetch and save new quotes
         }
         const jsondata = fs.readJSONSync(DATA_DIR + '/quotes.json')

         try  {
            const quotes = JSON.parse(jsondata.choices[0].message.content)
            fs.writeJSONSync(DATA_DIR + "/data.json", quotes, { spaces: 3 });
            return 0
         } catch (err) {
            let messages = ''+jsondata.choices[0].message.content
            const qlist = '['+messages.split('[')[1].split(']')[0]+']'
            const quotes = JSON.parse(qlist)
            fs.writeJSONSync(DATA_DIR + "/data.json", quotes, { spaces: 3 });
            return 0
         }
      } catch (err) {
         console.error(err)
         return 1
      }
   }

   async fetchNewQuotes() {
      // model: "gpt-3.5-turbo",
      // model: "gpt-4o-mini",

      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      const response = await openai.chat.completions.create({
         model: "gpt-4o-mini",
         messages: [{
            role: "user",
            content: [
               {
                  type: "text",
                  text: 'create a list of 50 "message of the day" quotes formatted as an array of json objects containing the fields message and author',
               },
            ],
         },
         ],
         max_tokens: 2000,
      })
      fs.writeJSONSync(DATA_DIR + "/quotes.json", response, { spaces: 3 });
   }

}
