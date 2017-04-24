const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

const port = 8000;
const srcPath =path.join(__dirname, "src");

const config = {
    context: srcPath,
    entry: './js/main.js',

    output: {
        path: srcPath,
        filename: 'index.min.js',
    },

    devServer: {
        inline: true,
        hot: true,
        noInfo: false,
        port: port,
        contentBase: srcPath,
        publicPath: "/"

    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },
            // Used for compiling ES2015 JavaScript
            //{ test: /\.js/, loader: 'babel-loader' },
            // Used for Bootstrap Less Source Files
            { test: /\.less/, loader: 'style-loader!css-loader!less-loader' },
            // Used for Bootstrap Less Source Files
            { test: /\.css/, loader: 'style-loader!css-loader' },
            // Used for Bootstrap Glyphicon Fonts
            { test: /\.(woff2|woff|ttf|svg|eot)$/, loader: 'file-loader' }
        ]
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    resolve: {
        alias: {
            components: srcPath + '/components/',
            config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV,
            images: srcPath + '/images/',
            store: srcPath + '/store/',
            styles: srcPath + '/styles/',
        },
        extensions: ['.js', '.jsx', '_pb.js'],
    }
};

module.exports = config;

