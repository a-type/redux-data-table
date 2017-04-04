const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';

const commonConfig = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[hash].js',
    publicPath: '/',
  },

  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [],
              presets: ['react', 'es2015', 'stage-0'],
            },
          },
        ]
      },
      {
        test: /\.(jpg|jpeg|png|webp|ico)$/,
        use: 'file-loader',
      },
      {
        test: /\.(svg|woff|woff2|eot|otf|ttf)$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    new webpack.DefinePlugin({
      ENV: TARGET_ENV,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
  ],

  target: 'web',
};

if (TARGET_ENV === 'development') {
  console.info('webpack >>> dev mode');
  module.exports = merge.smart(commonConfig, {
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/dev-server',
      path.join(__dirname, 'app.js'),
    ],

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['react', ['es2015', { modules: false }], 'stage-0'],
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],

    devtool: '#source-maps',
  });
}

if (TARGET_ENV === 'production') {
  console.info('webpack >>> prod build');
  module.exports = merge.smart(commonConfig, {
    entry: [path.join(__dirname, 'app.js')],

    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: { warnings: false },
      }),
    ],
  });
}
