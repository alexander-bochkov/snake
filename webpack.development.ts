import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { WebpackConfiguration } from 'webpack-dev-server';

const config: WebpackConfiguration = {
  context: path.join(__dirname, 'src'),
  devServer: {
    open: true,
  },
  devtool: 'eval-source-map',
  entry: './index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: ['ts-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  output: {
    filename: 'script.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'public/index.html'), title: 'Snake' }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

export default config;
