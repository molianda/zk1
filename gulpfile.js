/*
 * @Author: 田佳茹 
 * @Date: 2018-12-03 10:06:10 
 * @Last Modified by: 田佳茹
 * @Last Modified time: 2018-12-03 10:11:50
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');
var babel = require('gulp-babel');
var path = require('path');
var url = require('url');
var fs = require('fs');
var data = require('./data/bs.json');
//5.创建scss任务，进行scss文件编译,并且压缩css
gulp.task('scss', function() {
    return gulp.src('./src/sass/index.scss')
        .pipe(sass())
        .pipe(cleancss())
        .pipe(gulp.dest('./src/css'))
});
//新建js任务编译js文件，合并所有js，并且压缩
gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./src/build'))
});
//创建watch任务
gulp.task('watch', function() {
    return gulp.watch('./src/sass/index.scss', gulp.series('scss'));
});
//起服务
gulp.task('sever', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            webware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                }
                if (pathname === '/api/bscroll') {
                    res.end(JSON.stringify({ code: 1, data: data }));
                } else {
                    pathname = pathname === 'index.html' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(__dirname, 'src', pathname));
                }
            }
        }))
});
//创建default任务，执行js，css，watch任务
gulp.task('default', function() {
    return gulp.watch(gulp.series('js', 'scss', 'server', 'watch'))
})