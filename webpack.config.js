var path = require("path");
var glob = require("glob");

var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var PurifyCSSPlugin = require("purifycss-webpack");

module.exports = function(env) {
    var isPrd = function() {
        return env != "prd";
    };
    var cssLoader = {
        loader: "css-loader",
        options: {
            // root: "./src/images", //适用于@import
            url: false,
            minimize: isPrd()
        }
    };
    return {
        entry: "./src/app.js",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist")
        },
        devtool: "inline-source-map",
        devServer: {
            // contentBase: ".",
            hot: true
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"]
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: cssLoader
                })
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[hash].[ext]",
                    }
                }]
            }]
        },
        plugins: [
            new CleanWebpackPlugin(["dist"]),
            new HtmlWebpackPlugin({
                // title: "Hot Module Replacement",
                template: "index.html"
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin({
                filename: "[name].[contenthash].css",
                allChunks: false
            }),
            new PurifyCSSPlugin({
                paths: glob.sync(path.join(__dirname, "index.html")),
            })
        ]
    }
}

/*isPrd() ?
    ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [cssLoader]
    }) : [
        "style-loader",
        cssLoader
    ]*/