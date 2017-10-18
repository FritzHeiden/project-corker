const path = require('path');

module.exports = {
    entry: './src/core/core.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist/web-app')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};
