import path from 'path';
import type { StorybookConfig } from '@storybook/react-webpack5';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

function disableChunkSplitting(config) {
  config.optimization = { splitChunks: { chunks: 'async' } };
  config.output = { ...config.output, chunkFilename: '[chunkhash].chunk.js' };
  config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));

  return config;
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async config => {
    if (!config.resolve) {
      config.resolve = {};
    }

    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      })
    );

    return disableChunkSplitting(config);
  },
  staticDirs: ['./public'],
  env: config => ({
    ...config,
    VOTOGETHER_BASE_URL: '',
    VOTOGETHER_MOCKING_URL: '',
  }),
};
export default config;
