const path = require('path')

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
                test: /\.js$/,
                use: 'babel-loader'
            }
        ],
    },
    optimization: {
        minimize: true
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
        }
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        }
    },
    mode: "production"
}
