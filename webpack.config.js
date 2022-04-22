const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, args) => {
  const isProduction = args && args['mode'] === 'production';
  console.log(isProduction ? 'PRODUCTION BUILD' : 'DEVELOPMENT BUILD');
  return {
    entry: {
      app: path.join(__dirname, 'src', 'index.tsx')
    },
    target: 'web',
    mode: 'development',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: isProduction ? false : 'source-map',
    resolve: {
			extensions: ['.ts', '.tsx', '.js', '.html', '.txt'],
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
      },
		},
    module: {
			rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
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
    ]
  }
}