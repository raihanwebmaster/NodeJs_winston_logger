// libray funcation

import express from "express";
import configure from "./controllers";
import { handleErrors } from "./middlewares/handleErrors";
import {connectWithDB, url} from "./mongo";
import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch";
import { requestLogger,logger } from "./middlewares/logger";
const port = 8000;
const app = express();
app.use(express.json());

const processRequest = async (req, res, next) => {
  let correlationId = req.headers["x-correlation-id"];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers["x-correlation-id"] = correlationId;
  }
  res.set("x-correlation-id", correlationId);
  return next();
};
app.use(processRequest);
connectWithDB();

const getMessage = (req,res) => {
  let obj = {
    correlationId: req.header['x-correlation-id'],
    requestBody: req.body
  }
  return JSON.stringify(obj)
}


// const fileInfoTransport = new (winston.transports.DailyRotateFile)(
//   {
//     filename: 'log-info-%DATE%.log',
//     datePattern: "yyyy-MM-DD-HH",
//   }
// )


// const fileErrorTransport = new (winston.transports.DailyRotateFile)(
//   {
//     filename: 'log-error-%DATE%.log',
//     datePattern: "yyyy-MM-DD-HH",
//   }
// )

// const mongoErrorTransport = new winston.transports.MongoDB({
//   db: url,
//   metaKey: 'meta',
// })


// const elasticsearchOptions = {
//   level: 'info',
//   clientOpts: {node: "http://localhost:9200"},
//   indexPrefix: 'log-parcelkoi'
// }
// const esTransport = new (ElasticsearchTransport)(elasticsearchOptions)


// const infoLogger = expressWinston.logger({
//   transports: [
//     new winston.transports.Console(),
//     fileInfoTransport,
//     // elasticsearchOptions
//   ],
//   format:winston.format.combine(winston.format.colorize(), winston.format.json()),
//   meta: false,
//   msg: getMessage,
// })


// const errorLogger = expressWinston.errorLogger({
//   transports: [
//     new winston.transports.Console(),
//     fileErrorTransport,
//     mongoErrorTransport,
//     // elasticsearchOptions
//   ],
//   format:winston.format.combine(winston.format.colorize(), winston.format.json()),
//   meta: true,
//   msg: '{"correlationId" : "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}"}',
// })


// app.use(infoLogger)

app.use(expressWinston.logger({
  winstonInstance: requestLogger,
  statusLevels: true,
  // msg: getMessage,
}))
expressWinston.requestWhitelist.push('body')
expressWinston.responseWhitelist.push('body')
configure(app);

app.use(expressWinston.errorLogger({
  winstonInstance: logger,
  // statusLevels: true,
  // msg: getMessage,
}))


// app.use(errorLogger)
app.use(handleErrors);
app.listen(port, () => {
  console.log("Listening to port" + port);
});
