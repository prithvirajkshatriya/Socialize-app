// Initializing webpack to compile the client-side code when the server starts up.
// Here, compile() is set up that takes express app and configures it to use webpack
// middleware to compile, bundle and serve code simultaneously enabling hot-reloading.

// For development mode, comment the code in webpack.config.client.production.js and
// add devBundle.js import and devBundle.compile(app) lines in express.js .

// For production mode, comment the devBundle.js import and devBundle.compile(app) lines
// in express.js & uncomment the code in webpack.config.client.production.js .

import config from './../config/config';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './../webpack.config.client';

const compile = (app) => {
  // if (process.env.NODE_ENV == 'development') {
  if (config.env == 'development') {
    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
  }
};

export default {
  compile,
};
