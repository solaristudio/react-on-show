const { src, dest, series } = require('gulp')
const del = require('del')
const webpack = require('webpack-stream')
const prettier = require('gulp-prettier')
const concat = require('gulp-concat')
const install = require('gulp-install')
const jest = require('gulp-jest').default
const run = command => require('gulp-run')(command, {})

function installDeps() {
    return src('./package.json').pipe(install())
}

function clear(cb) {
    del.sync('dist/**/*.js')
    cb()
}

function prettify() {
    return src('src/*.js').pipe(prettier()).pipe(dest('src'))
}

function test() {
    return src('tests').pipe(jest())
}

function bundle() {
    return src(['src/Component.js', 'src/Function.js']).pipe(concat({
        path: 'on-shown.js',
        stat: {
            mode: 0o666
        }
    })).pipe(dest('src'))
}

function buildWithWebpack() {
    return src('src/on-shown.js').pipe(webpack(require('./webpack.config.js'))).pipe(dest('dist'))
}

function removeSourceFile(cb) {
    del('src/on-shown.js')
    cb()
}

function addStructureMarkDown() {
    return run('npm run jsdoc').exec()
}

exports.default = series(installDeps, clear, prettify, test, bundle, buildWithWebpack, removeSourceFile, addStructureMarkDown)
exports.buildWithoutTesting = series(installDeps, clear, prettify, bundle, buildWithWebpack, removeSourceFile, addStructureMarkDown)
