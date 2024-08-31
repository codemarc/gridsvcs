#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const inputDir = path.join(__dirname, 'json')
const outputFilePath = path.join(__dirname, 'insertpanels.sql')

// Read all files from the input directory
fs.readdir(inputDir, (err, files) => {
   if (err) {
      console.error(`Error reading directory: ${err}`)
      process.exit(1)
   }

   let sqlStatements = `INSERT INTO cmc.panels (name, links) VALUES\n`

   files.forEach((file, index) => {
      const inputFilePath = path.join(inputDir, file)
      console.log(`Processing file: ${inputFilePath}`)

      // Read the JSON file
      const data = fs.readFileSync(inputFilePath, 'utf8')
      const jsonData = JSON.parse(data)

      // Generate SQL statement
      const name = path.basename(file, path.extname(file)) // Use file name without extension as name
      const links = JSON.stringify(jsonData)
      sqlStatements += `('${name}', '${links.replace(/'/g, "''")}')`

      // Add a comma if it's not the last file
      if (index < files.length - 1) {
         sqlStatements += ',\n'
      } else {
         sqlStatements += ';\n'
      }
   })

   // Write the SQL statements to the output file
   fs.writeFileSync(outputFilePath, sqlStatements, 'utf8')
   console.log(`SQL script generated at ${outputFilePath}`)
})