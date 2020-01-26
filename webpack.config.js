const path = require('path');
const RemoveStrictPlugin = require( 'remove-strict-webpack-plugin' );
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
    library: "Vue",
    libraryTarget: "umd",
    libraryExport: "default"
  },
  plugins: [
    new RemoveStrictPlugin()
  ]
}