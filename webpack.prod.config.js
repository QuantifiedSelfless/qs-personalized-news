//webpack and its dependencies
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//package.json to pull in the project title
var pjson = require('./package.json');

module.exports = {
    entry: [
        './src/index.jsx'
    ],
    module: {
        preLoaders: [
            {
                test: /\.json$/, 
                exclude: /node_modules/,
                loader: 'json'
            }
        ],
        loaders:[
            {
             test: /\.(jpeg|png)$/,
             exclude: /node_modules/,
             loader: 'url-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]", "sass"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel'
            },
            {
                test: /\.(tff?|html)$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        /*new HtmlWebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title: 'Global News: Your Personal Headlines for March 6th, 2050',
            appMountId: 'app'
        }),*/
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    ]
};
