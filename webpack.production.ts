import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { WebpackConfiguration } from 'webpack-dev-server';

const config: WebpackConfiguration = {
  context: path.join(__dirname, 'src'),
  entry: './index.ts',
  mode: 'production',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    filename: 'script.[fullhash].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'public/index.html'), title: 'Snake' }),
    new MiniCssExtractPlugin({ filename: 'style.[fullhash].css' }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

export default config;
