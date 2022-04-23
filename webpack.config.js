const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
      filename: '[name].js',
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
                    modules: true,
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
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: '/node_modules/'
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/template.html'
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      }),
    ]
  }
}