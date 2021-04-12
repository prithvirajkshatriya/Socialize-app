const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();

const config = {
  mode: 'production',
  entry: [path.join(CURRENT_WORKING_DIR, 'client/main.js')],
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
