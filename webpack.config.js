module.exports = {
  entry: './src/index',

  output: {
    path: './dist/',
    filename: 'react-test-unit.js',
    library: 'react-test-unit',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js']
  },

  externals: {
    'react/addons': 'react/addons'
  },

  module: {
    loaders: [
      { test: /.jsx?$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
};
