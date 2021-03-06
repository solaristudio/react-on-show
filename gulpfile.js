const { src, dest, series } = require('gulp')
const del = require('del')
const webpack = require('webpack-stream')
const prettier = require('gulp-prettier')
const install = require('gulp-install')
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

function compileTypeScript() {
    return run('tsc').exec()
}

function moveDeclarationFile(cb) {
    fsExtra.copySync('release/react-on-show.d.ts', 'dist/index.d.ts')
    cb()
}

function buildWithWebpack() {
    return src('src/react-on-show.tsx').pipe(webpack(require('./webpack.config.js'))).pipe(dest('dist'))
}

function removeReleaseFolder(cb) {
    del('release')
    cb()
}

function getBundleInfo() {
    return run('npm pack --dry-run').exec()
}

exports.default = series(clear, prettify, compileTypeScript, moveDeclarationFile, removeReleaseFolder, buildWithWebpack, getBundleInfo)
exports.defaultWithDeps = series(installDeps, clear, prettify, compileTypeScript, moveDeclarationFile, removeReleaseFolder, buildWithWebpack)
exports.bundleInfo = getBundleInfo
exports.compileTypeScript = compileTypeScript
