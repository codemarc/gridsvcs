#!/usr/bin/env node --no-warnings
import prog from "caporal"
import logger from "./src/logger.js"
import fs from "fs-extra"
import cqs from "./src/cqs.js"
import qqs from "./src/qqs.js"
import { server } from "./src/server.js"
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
         const qq = new qqs()
         const quotes = (await qq.getQuotesMeta()).data
         svc = Object.assign({ version: version, build: generate() }, quotes)
         fs.writeJSONSync("build.num", svc, { spaces: 3 })
         logger.info(`build number ${svc.build}`)
      })

      // =====================================================================
      .command("refresh", "updates all cached data")
      .argument("[topic]", "topic to refresh", prog.STRING)
      .option("-l, --list", "topics", false)
      .option("-t, --topics", "refresh topics list", false)
      .option("-f, --force", "force a cache update", false)
      .action(async (args, options) => {
         try {
            // TODO: implement topic list refresh
            if(options.topics) {
               logger.info(`topics list is not implemented yet`)
               return
            }

            let qq = new qqs()
            const topics = await qq.getTopics()

            if(options.list) {
               console.log(`\ntopics:`)
               topics.data.forEach(element => {
                  console.log(`\t${element.topic}`)
               })
               console.log(`\n`)
               return
            }

            if(args.topic) {
               if(topics.data.filter(x => x.topic == args.topic).length == 0) {
                  logger.error(`topic ${args.topic} not found`)
                  console.log(`\n`)
                  return
               }
            }

            let cq = new cqs()
            logger.info(`refreshing quotes ${options.force ? "forced" : ""}`)
            cq.refreshQuotes(options.force,args.topic)
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
