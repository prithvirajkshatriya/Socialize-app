import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "helmet";
import helmet from "cors";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use('/', userRoutes);
app.use('/', authRoutes);

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      "error": err.name + ": " + err.message
    });
  } else if (err) {
    res.status(400).json({
      "error": err.name + ": " + err.message
    });
    console.log(err);
  }
});

export default app;