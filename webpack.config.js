let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/client/js/client.js",
    output: {
      path: __dirname,
      filename: "client/js/client.js",
    },

    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel'] },
        {
          test: /\.(css|scss)(\?\S*)?$/,
          loader: ExtractTextPlugin.extract(
            "style",
            "css?sourceMap!sass?sourceMap",
            { publicPath: '../' }
            // (up)-> workaround to a problem of relative path when putting *.css file into css/ folder
          ),
        },
        { test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/, loader: 'file?name=client/images/[name].[ext]' },
        { test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/, loader: 'file?name=client/fonts/[name].[ext]' }
      ]
    },

    plugins: [
        new ExtractTextPlugin("client/css/main.css"),
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})  // <-- takes some time
    ],

    sassLoader: {
      includePaths: [path.resolve('./src/client')]
    },
    resolve: {
      root: [path.resolve('./src/client')]
    }
};
