const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
        library: 'react-on-show',
        libraryTarget: 'commonjs2',
        publicPath: '/dist/',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader'
            }
        ],
    },
    mode: 'production',
    optimization: {
        minimize: true,
        usedExports: true,
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                compress: false
            }
        })]
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
        }
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        }
    }
}
