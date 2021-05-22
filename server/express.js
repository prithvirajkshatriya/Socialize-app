import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';

// Server side rendering modules.
import React from 'react';
import ReactDomServer from 'react-dom/server';
import MainRouter from './../client/MainRouter';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from './../client/theme';

// Should be removed when building for production.
import devBundle from './devBundle';

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// Should be removed when building for production.
devBundle.compile(app);

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

// Mounting routes.
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', postRoutes);

// Generate CSS styles using Material-UI's ServerStyleSheets.
// Use renderToString to generate markup which renders components specific to the route requested.
// Return template with markup and CSS styles in the response.
app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDomServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
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
