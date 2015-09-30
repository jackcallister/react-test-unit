module.exports = {
  entry: './src/index',

  output: {
    path: './lib/',
    filename: 'react-test-unit.js',
    library: 'react-test-unit',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js']
  },

  externals: {
    'react': 'react'
  },

  module: {
    loaders: [
      { test: /.jsx?$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
};
