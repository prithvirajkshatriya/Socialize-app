import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "helmet";
import helmet from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

export default app;
