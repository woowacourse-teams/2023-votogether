const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production', // 현재 배포 모드
  devtool: 'hidden-source-map', // 느리지만 안전 배포에 추천
});
