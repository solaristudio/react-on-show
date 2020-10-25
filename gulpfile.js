const { src, dest, series } = require('gulp')
const babel = require('gulp-babel')
const del = require('del')
const prettier = require('gulp-prettier')
const concat = require('gulp-concat')
const install =require('gulp-install')

function installDeps() {
    return src('./package.json').pipe(install())
}

function clear(cb) {
    del('dist/**/*.js')
    cb()
}

function prettify() {
    return src('src/*.js').pipe(prettier()).pipe(dest('src'))
}

function bundle() {
    return src(['src/Component.js', 'src/Function.js']).pipe(concat({
        path: 'on-shown.js',
        stat: {
            mode: 0o666
        }
    })).pipe(dest('src'))
}

function build() {
    return src('src/on-shown.js').pipe(babel()).pipe(dest('dist'))
}

function removeSourceFile(cb) {
    del('src/on-shown.js')
    cb()
}

function finish(cb) {
    console.log('Build is finished.')
    cb()
}

exports.default = series(installDeps, clear, prettify, bundle, build, removeSourceFile, finish)
