const { src, dest, series } = require('gulp')
const babel = require('gulp-babel')
const del = require('del')
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

function build() {
    return src('src/on-shown.js').pipe(babel()).pipe(rename('index.js')).pipe(dest('dist'))
}

function removeSourceFile(cb) {
    del('src/on-shown.js')
    cb()
}

function removeBuild(cb) {
    del.sync('build')
    cb()
}

function moveReactAppBuildToRootDir(cb) {
    fs.moveSync('page/build', 'build', err => {
        if (err) return console.error(err)
        console.log('Build file is successfully moved to the root directory.')
    })
    cb()
}

exports.default = series(installDeps, clear, prettify, test, bundle, build, removeSourceFile)
exports.buildWithoutTesting = series(installDeps, clear, prettify, bundle, build, removeSourceFile)
exports.moveBuild = series(removeBuild, moveReactAppBuildToRootDir)
