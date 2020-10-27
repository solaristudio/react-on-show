const { src, dest, series } = require('gulp')
const del = require('del')
const webpack = require('webpack-stream')
const prettier = require('gulp-prettier')
const concat = require('gulp-concat')
const install = require('gulp-install')
const rename = require('gulp-rename')
const jest = require('gulp-jest').default
const fs = require('fs-extra')

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

function removeBuild(cb) {
    del.sync('build')
    cb()
}

exports.default = series(installDeps, clear, prettify, test, bundle, buildWithWebpack, removeSourceFile)
exports.buildWithoutTesting = series(installDeps, clear, prettify, bundle, buildWithWebpack, removeSourceFile)
