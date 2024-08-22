#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const inputDir = path.join(__dirname, './yaml')
const outputDir = path.join(__dirname, './json')

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
   fs.mkdirSync(outputDir, { recursive: true })
}

// Read all files from the input directory
fs.readdir(inputDir, (err, files) => {
   if (err) {
      console.error(`Error reading directory: ${err}`)
      process.exit(1)
   }

   files.forEach(file => {
      const inputFilePath = path.join(inputDir, file)
      let outputFileName = file.replace(/.*?-/, '').replace(/\.yaml$/, '.json')
      const outputFilePath = path.join(outputDir, outputFileName)

      // Read the YAML file
      fs.readFile(inputFilePath, 'utf8', (err, data) => {
         if (err) {
            console.error(`Error reading file ${inputFilePath}: ${err}`)
            return
         }

         try {
            // Convert YAML to JSON
            const jsonData = yaml.load(data)
            const jsonString = JSON.stringify(jsonData, null, 2)

            // Write the JSON file
            fs.writeFile(outputFilePath, jsonString, 'utf8', err => {
               if (err) {
                  console.error(`Error writing file ${outputFilePath}: ${err}`)
               } else {
                  console.log(`Converted ${inputFilePath} to ${outputFilePath}`)
               }
            })
         } catch (e) {
            console.error(`Error converting YAML to JSON for file ${inputFilePath}: ${e}`)
         }
      })
   })
})