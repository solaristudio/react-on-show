const { src, dest, series } = require('gulp')
const del = require('del')
const webpack = require('webpack-stream')
const prettier = require('gulp-prettier')
const install = require('gulp-install')
const jest = require('gulp-jest').default
const run = command => require('gulp-run')(command, {})
const fsExtra = require('fs-extra')

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

function compileTypeScript() {
    return run('tsc').exec()
}

function moveDeclarationFile(cb) {
    fsExtra.copySync('release/react-on-show.d.ts', 'dist/index.d.ts')
    cb()
}

function buildWithWebpack() {
    return src('release/react-on-show.js').pipe(webpack(require('./webpack.config.js'))).pipe(dest('dist'))
}

function removeReleaseFolder(cb) {
    del('release')
    cb()
}

exports.default = series(installDeps, clear, prettify, test, series(compileTypeScript, moveDeclarationFile, buildWithWebpack, removeReleaseFolder))
exports.buildWithoutTesting = series(installDeps, clear, prettify, series(compileTypeScript, moveDeclarationFile, buildWithWebpack, removeReleaseFolder))
