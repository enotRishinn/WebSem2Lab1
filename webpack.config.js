var path = require('path');

module.exports = {
  entry: './onload.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'main')
  }
};
