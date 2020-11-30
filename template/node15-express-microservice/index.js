import express from "express";
import bodyParser from "body-parser";
import getPino from "pino";

import handler from "./function/handler.js";

const app = express();
const pino = getPino();

async function start() {
  const port = process.env.http_port || 3000;

  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(bodyParser.text({ type: "text/*" }));
  app.disable("x-powered-by");

  app.use(await handler({ app }));

  app.listen(port, () => {
    pino.info(`Listening on port ${port}`);
  });
}

start();
