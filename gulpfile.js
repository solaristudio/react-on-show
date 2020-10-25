const { src, dest, series } = require('gulp')
const babel = require('gulp-babel')
const del = require('del')

function clear(cb) {
    del('dist/**/*.js')
    cb()
}

function prettify() {
    return src()
}

function build() {
    return src('./src/on-shown.js').pipe(babel()).pipe(dest('dist'))
}

function finish(cb) {
    console.log('Build is finished.')
    cb()
}

exports.default = series(clear, build, finish)
