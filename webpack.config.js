const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, './src/react-on-show.tsx'),
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
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            sourceMap: true,
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
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'prop-types': {
            root: 'PropTypes',
            commonjs2: 'prop-types',
            commonjs: 'prop-types',
            amd: 'prop-types'
        }
    },
    mode: "production"
}
