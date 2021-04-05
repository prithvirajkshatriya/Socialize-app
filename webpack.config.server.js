const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CURRENT_WORKING_DIR = process.cwd();

const config = {
  name: 'server',
  entry: [path.join(CURRENT_WORKING_DIR, './server/server.js')],
  target: 'node',
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/'),
    filename: 'server.generated.js',
    publicPath: '/dist/',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // To bundle image assests so that other JS code can also access
      // and load it other than the component in which it was imported into.
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
};

module.exports = config;
