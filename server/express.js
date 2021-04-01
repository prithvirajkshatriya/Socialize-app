import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
// import devBundle from "./devBundle"; //This line should be removed when building for production.

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// devBundle.compile(app); //This line should be removed when building for production.

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(compress());

// Secure apps by setting various HTTP headers.
app.use(helmet());

// Cross origin resource sharing
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.status(200).send(Template());
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: err.name + ': ' + err.message,
    });
  } else if (err) {
    res.status(400).json({
      error: err.name + ': ' + err.message,
    });
    console.log(err);
  }
});

export default app;
