const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //打包html的插件
// const ExtractTextPlugin = require('extract-text-webpack-plugin') //css 单独打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf");

module.exports = merge(baseConfig,{
	mode: 'production',
	entry: { index: './src/main.js' },
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[hash].js',
        chunkFilename: '[name].bundle.js',
		publicPath: './'
	},
    
	module: {
		//配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
		rules: [
			{
				test: /\.(sa|sc|le|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					'css-loader',
					'less-loader',
					{
						loader: 'postcss-loader',
						options: {
							// 如果没有options这个选项将会报错 No PostCSS Config found
							plugins: loader => [
								require('autoprefixer')() //CSS浏览器兼容
							]
						}
					},
					// 'sass-loader'
				]
			}
		]
	},
	plugins: [
		// new VueLoaderPlugin(), //vue插件
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
        new webpack.DefinePlugin({
			"$env": "production",
			"$version": JSON.stringify("v1.0.0")
		}),
	]
})
