const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill",'./src/app/app.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
        overlay: true,
        proxy: {
            "/api/**":{
                target: "http://localhost:3000/",
                secure: false,
                changeOrigin: true,
            },
            "/*.mp4":{
                target: "http://localhost:3000/",
                secure: false,
                changeOrigin: true,
            },
            "/*.jpg":{
                target: "http://localhost:3000/",
                secure: false,
                changeOrigin: true,
            }
        },
        historyApiFallback: {
            index: '/'
        },

    },
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader?modules"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/app/index.html",
            filename: "./index.html",
            inject: false,
        })
    ]
};