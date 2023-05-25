/* eslint-disable no-unused-vars */
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import chalk from "chalk";
import morgan from "morgan";
// import {getPantone} from './getPantone.js'
import {getPantone} from './getPantone.js'
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get('/',getPantone)

app.use((error, req, res, next) => {
  res.statusCode = error.httpStatus || 500;
  res.send({
    status: "error",
    message: error.message,
    code:error.httpStatus,
  });
});
const { API_PORT, API_SERVER } = process.env;
app.listen(API_PORT, () => {
  console.log(chalk.bold.bgYellow(`Server run in ${API_SERVER}:${API_PORT}`));
});
