const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const { EsbuildPlugin } = require('esbuild-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@type': path.resolve(__dirname, 'src/types'),
      '@atoms': path.resolve(__dirname, 'src/atoms'),
      '@selectors': path.resolve(__dirname, 'src/selectors'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2021',
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'esbuild-loader',
            options: {
              minify: true,
            },
          },
        ],
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CleanWebpackPlugin(),
    new DotenvWebpack(),
    new CopyPlugin({
      patterns: [
        { from: 'public/icons', to: 'icons' },
        { from: 'public/seo', to: './' },
      ],
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: 'public',
    hot: true,
    open: true,
  },
  optimization: {
    minimizer: [
      new EsbuildPlugin({
        target: 'es2021',
      }),
    ],
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
        },
      },
    },
  },
};
