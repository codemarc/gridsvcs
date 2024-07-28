#!/usr/bin/env node
const pak = require("../package.json")
const exec = require("shelljs.exec")

const DEFNAME = `gridsvcs`
const DSERVER = `codemarc@codemarc.net`
const DFOLDER = `codemarc.net/web/`
const DOCTARG = `doc/${DEFNAME}`

// =============================================================================
const deployDoc = async () => {
   const log = (txt) => console.log(`${DEFNAME}: ${txt}`)
   log(`creating/updating deployment`)
   if(process.argv.includes("clean"))await exec(`ssh ${DSERVER} "rm -rf ${DFOLDER}/${DOCTARG}"`)
   await exec(`ssh ${DSERVER} "cd ${DFOLDER} && mkdir -p ${DOCTARG}/img"`)
   log(`copying index.html and *.md to ${DOCTARG}`)
   await exec(`scp ./index.html ${DSERVER}:${DFOLDER}/${DOCTARG}`)
   await exec(`scp ./*.md ${DSERVER}:${DFOLDER}/${DOCTARG}`)
   log(`copying assets to ${DOCTARG}/img`)
   await exec(`scp ./img/*.* ${DSERVER}:${DFOLDER}/${DOCTARG}/img`)
}

// =============================================================================
// main
// =============================================================================
(async () => {
   const desc = "build and deploy the gridlinks doc site"
   console.log(`\n${pak.name} v${pak.version} - ${desc}\n`)
   await deployDoc()
   console.log(`done!\n`)
})()

