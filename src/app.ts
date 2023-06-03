import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import dotenv from "dotenv";

import { notFound, errorHandler } from "./middlewares";
import router from "./api";

dotenv.config();

const app: express.Application = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({
    message: "unicornheadrainbow✨hi✨rainbowunicornhead",
  });
});

app.use("/api/v1", router);

app.use(notFound);
app.use(errorHandler);

export default app;
