const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // 현재 개발 모드
  devtool: 'eval', // 최대성능, 개발환경에 추천
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
});
