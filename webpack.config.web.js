const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/web-app/core/core.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist/web-app')
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.js$|\.jsx$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist/web-app"),
        compress: true,
        port: 5432,
        hot: true
    }
};
