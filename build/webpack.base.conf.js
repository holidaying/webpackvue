const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //打包html的插件
// const ExtractTextPlugin = require('extract-text-webpack-plugin') //css 单独打包
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
console.log(VueLoaderPlugin)

console.log('==================')
module.exports = {
    module: {
        //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
        rules: [
            {
                test: /\.(png|jp?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // limit: 8192,
                            name:'./image/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [
                            'syntax-dynamic-import',
                            ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }] // `style: true` 会加载 less 文件
                        ]
                    }
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js', // 用 webpack 1 时需用 'vue/dist/vue.common.js'
            src: path.resolve(__dirname, '../src'),
            modules: path.resolve(__dirname, '../src/modules'),
            components: path.resolve(__dirname, '../src/components'),
            style: path.resolve(__dirname, '../src/style'),
            bizComponents: path.resolve(__dirname, '../src/bizComponents'),
            static: path.resolve(__dirname, '../static')
        },
        extensions: ['.js', '.vue', '.coffee', '.html', '.css', '.scss', '.less']
    },
    plugins: [
        new VueLoaderPlugin(), //vue插件
        //将,css和html注入到模板中
        new HtmlWebpackPlugin({
            title: 'aaaa',
            chunks: ['index'],
            filename: 'index.html',
            hash: true, // 会在打包好的bundle.js后面加上hash串
            inject: 'body',
            template: 'index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
}
