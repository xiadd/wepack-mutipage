const path = require("path");
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');


module.exports = {
  context: __dirname,
  entry: {
    index: './assets/index.js',
    app: './assets/test.js'
  },
  output: {
      path: path.resolve('./assets/bundles/'),
      filename: "[name]-[hash].js",
      publicPath: '/static/bundles/',
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    new ManifestPlugin({
      basePath: '/static/',
      writeToFileEmit: true
    }),
    new ExtractTextPlugin({ filename: "css/[name]-[contenthash:6].css", allChunks: true }),
    new CleanPlugin(['*'], {
      root: path.resolve(__dirname, './assets/bundles')
    })

  ],

  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?sourceMap&minimize'
        })
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    host: '0.0.0.0',
    port: "3000",
    hot: true,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};