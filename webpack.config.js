const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');

const PORT = 3000;

module.exports = {
	entry: './src/index.ts',
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: ['babel-loader', 'ts-loader'],
			},
			{ test: /\.js?$/, use: ['babel-loader'] },
			{ test: /\.css?$/, use: ['style-loader', 'css-loader'] },
		],
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new DotenvWebpackPlugin(),
	],
	devServer: {
		historyApiFallback: true,
		port: PORT,
		hot: true,
	},
};
