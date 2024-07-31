import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import packageJson from "../package.json" assert { type: "json" }
const { name, version, description } = packageJson

const options = {
   definition: {
      openapi: "3.1.0",
      info: {
         version: version,
         title: name,
         description: description,
         contact: {
            email: "api@codemarc.net",
         },
         // license: {
         // name: "MIT",
         // url: "https://codemarc.net/doc/LICENSE.txt",
         // },
      },
      externalDocs: {
         description: "GridSvcs API",
         url: "https://codemarc.net/doc/gridsvcs/#/",
      },
      servers: [
         {
            url: "http://localhost:3000/",
            description: "Development server",
         },
         {
            url: "https://codemarc.net/api/",
            description: "Production server",
         },
      ],
      tags: [
         {
            name: "motd",
            description: "Message of the Day",
         },
      ],
   },
   apis: ["./src/*.js"],
};

const swaggerSpec = swaggerJSDoc(options)

export default function swaggerSetup(app) {
   app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}