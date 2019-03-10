const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //打包html的插件
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const devServerConfig = require('./devServer.js')

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
console.log('==================')
module.exports = merge(baseConfig, {
    mode: 'development',
    entry: { index: './src/main.js' },
    output: {
        path: path.resolve(__dirname, '../static'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
        rules: [
            {
                test: /\.(sa|sc|le|c)ss$/,
                use: [
                    'vue-style-loader',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            $env: 'development',
            $version: JSON.stringify('v1.0.0')
        })
    ],
    devServer: devServerConfig.devServer
})
