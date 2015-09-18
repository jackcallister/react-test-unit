module.exports = {
  entry: './src/react-test-unit',

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
    'react': 'React',
    'react/addons': 'React'
  },

  module: {
    loaders: [
      { test: /.jsx?$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
};
