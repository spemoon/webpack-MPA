const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const indexExtractCss = new ExtractTextPlugin('index/[name].[hash].css')
const aboutExtractCss = new ExtractTextPlugin('about/[name].[hash].css')

module.exports = {
    mode: 'development',
    //入口设置
    entry: {
        index: path.resolve(__dirname, "src/js/index.js"),
        about: path.resolve(__dirname, "src/js/about.js")
    },
    //出口设置
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    //加载器配置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /src(\\|\/)css(\\|\/)index.(css|scss)$/,
                use: indexExtractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                }),
            },
            {
                test: /src(\\|\/)css(\\|\/)about.(css|scss)$/,
                use: aboutExtractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
        ]
    } ,
    //配置查找模块的路径和扩展名和别名
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css', '.scss']
    },
    devServer: {
        contentBase: "./",
        historyApiFallback: true,
        hot: true,
        open: true,
        inline: true,
        port: 8000
    },
    //插件配置
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './src/html/about.html',
            chunks: ['about'],
        }),
        indexExtractCss,
        aboutExtractCss,
    ],
    optimization: {
        minimize: true
    }
}
if (process.env.NODE_ENV === 'production') {
    module.exports.mode = 'production';
}