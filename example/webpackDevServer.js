const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

webpackConfig.output.publicPath = `http://localhost:3000${webpackConfig.output.publicPath}`;

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  inline: true,
  hot: true,
  historyApiFallback: true,
  contentBase: './'
});
server.listen(3000, 'localhost', function() { console.info('Webpack dev server started at http://localhost:3000') });
