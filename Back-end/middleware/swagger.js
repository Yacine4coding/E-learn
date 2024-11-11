import swaggerJSDoc from "swagger-jsdoc";
import express from "express";
import { serve, setup } from "swagger-ui-express";
const apiDoc = express.Router();
const options = {
  definition: {
    openait: "3.0.0",
    info: {
      title: "e-learn api document",
      version: "1.5",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/**.js", "./index.js"],
};
const swaggerJsDoc = swaggerJSDoc(options);
apiDoc.use("", serve, setup(swaggerJsDoc));
export default apiDoc;
