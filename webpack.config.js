const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, args) => {
  const isDevelopment = !args || !args['mode'] || args['mode'] === 'development';
  console.log(isDevelopment ? 'DEVELOPMENT BUILD' : 'PRODUCTION BUILD');
  return {
    entry: {
      app: path.join(__dirname, 'src', 'index.tsx')
    },
    target: 'web',
    mode: isDevelopment ? 'development' : 'production',
    output: {
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: isDevelopment ? 'source-map' : false,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.html', '.scss'],
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          oneOf: [
            {
              test: /\.module\.scss$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: { 
                    modules: {
                      exportLocalsConvention: 'camelCase',
                    }
                  }
                },
                'sass-loader'
              ]
            },
            {
              use: [
                MiniCssExtractPlugin.loader, 
                'css-loader',
                'sass-loader'
              ]
            }
          ]
        },
        {
          test: /\.css$/,
          oneOf: [
            {
              use: [
                MiniCssExtractPlugin.loader, 
                'css-loader',
              ]
            }
          ]
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: '/node_modules/'
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "src/asset", to: "./" },
        ],
      }),
      new HtmlWebpackPlugin({
        template: 'src/asset/template.html'
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css'
      }),
    ]
  }
}