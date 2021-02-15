const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const { isPropertyDeclaration } = require('typescript');

//  object를 exports할 수도 있지만, 함수를 return하는 방법을 사용하면 cli 옵션을 인식할 수 있다.

module.exports = (env) => {
  const isProduction = env.WEBPACK_BUILD ? true : false
  console.log(isProduction)

  return {
    mode: isProduction ? "production" : "development",
    entry: {
      main: "./src/app.tsx"
    },
    output: {
      path: path.resolve('./dist'),
      filename: '[name].js',
      // filename: '[name].bundle.js'  // 복수의 js 파일을 컴파일해야하는 경우
    },
    // target : ['web'], // for default, web | webworker | es5 | node
    devServer: {
      contentBase: path.resolve('./dist'),
      // index: "index.html", // for default
      // inline: true, // for default
      overlay: true,  // full screen compile error or warning
      open: true,   // dev Serve 구동 후 index에 명시된 페이지 열기
      // openPage: "...", // dev Serve 구동 후 특정 페이지 열기
      historyApiFallback: true, // react-router-dom 등에 사용
      compress: true,
      port: 9000
    },
    optimization: {
      // https://webpack.js.org/plugins/terser-webpack-plugin/
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    stats: {
      builtAt: false,
      children: false,
      entrypoints: false,
      hash: false,
      modules: false,
      version: false,
      publicPath: false,
      excludeAssets: [/\.(map|txt|jpg|png)$/, /\.json$/],
      warningsFilter: [/exceed/, /performance/],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        // {
        //   // https://webpack.js.org/guides/typescript/
        //   test: /\.tsx?$/,
        //   use: 'ts-loader',
        //   exclude: /node_modules/,
        // },
        {
          // babel
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: "/node_modules",
          use: [{
            loader: 'babel-loader',
            options: {
              // build time 단축을 위한 cacheing
              cacheDirectory: true,
              cacheCompression: false,
            }
          }]
        },
        {
          // https://webpack.js.org/loaders/css-loader/
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // https://webpack.js.org/loaders/file-loader/
          test: /\.(png|jpe?g|gif)$/i,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          },],
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"  // 없으면 webpack이 자체적으로 html을 생성한다.
        // filename: 'index.html' // for default
      }),
      new CleanWebpackPlugin(),  // cache를 사용하면 굳이 쓸 필요 없음.
      // new BundleAnalyzerPlugin(),
      new Dotenv(),
      new webpack.DefinePlugin({
        "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL)
      })
    ]
  }
}