import prog from "caporal"
import cqs from "./src/cqs.js"
import {server} from "./src/app.js"
import packageJson from "./package.json" assert { type: "json" }
const { name, version, description } = packageJson

try {
   // =======================================================================
   // cli processing
   // =======================================================================
   prog
      .bin(name)
      .version(version)
      .description(description)

      // =====================================================================
      .command("refresh", "updates all cached data")
      .option("-f, --force", "force a cache update", false)
      .action(async (args, options) => {
         try {
            let cq = new cqs()
            cq.refreshQuotes(options.force)
         } catch (e) {
            throw e
         }
      })

      // =====================================================================
      .command("server", "start the service")
      .action(async (args, options) => {
         server()
      })

   prog.parse(process.argv)
} catch (err) {
   console.error(err)
}
