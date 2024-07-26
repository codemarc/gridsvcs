#!/usr/bin/env node
import prog from "caporal"
import logger from "./src/logger.js"
import fs from "fs-extra"
import cqs from "./src/cqs.js"
import { server } from "./src/app.js"
import { generate } from "build-number-generator"
import packageJson from "./package.json" assert { type: "json" }
const { name, version, description } = packageJson


try {
   let svc=fs.readJSONSync("build.num")

   // =======================================================================
   // cli processing
   // =======================================================================
   prog
      .bin(name)
      .version(version)
      .description(description)

      // =====================================================================
      .command("update", "generate a build number")
      .action(async (args, options) => {
         svc = { version: version, build: generate() }
         fs.writeJSONSync("build.num", svc, { spaces: 3 })
         logger.info(`build number ${svc.build}`)
      })

      // =====================================================================
      .command("refresh", "updates all cached data")
      .option("-f, --force", "force a cache update", false)
      .action(async (args, options) => {
         try {
            let cq = new cqs()
            logger.info(`refreshing quotes ${options.force ? "forced" : ""}`)
            cq.refreshQuotes(options.force)
            logger.info(`refreshing quotes completes`)
         } catch (e) {
            throw e
         }
      })

      // =====================================================================
      .command("server", "start the service")
      .action(async (args, options) => {
         logger.info("starting server")
         server()
      })

   logger.info(`running ${name} cli v${version} build ${svc.build}`)
   if (process.argv.length < 3) logger.info("no command issued")

   prog.parse(process.argv)
} catch (err) {
   console.error(err)
}
