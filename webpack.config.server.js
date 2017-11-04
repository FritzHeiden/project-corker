const path = require('path');

module.exports = {
    entry: './src/server.js',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: "node",
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    externals: {
        "react": "React"
    }
};
