var gulp = require('gulp');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var ugli = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var server = require('gulp-webserver');
var path = require('path');
var url = require('url');
var fs = require('fs');
var swiperdata = require("./mock/swiper.json");
gulp.task('devsass', function() {
    return gulp.src('./src/sass/index.scss')
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(cleancss())
        .pipe(gulp.dest('./src/css'))
});
gulp.task('watch', function() {
    return gulp.watch('./src/sass/index.scss', gulp.series('devsass'));
});
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                }
                if (pathname === '/api/swiper') {
                    res.end(JSON.stringify({ code: 1, swiperdata: swiperdata }));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})
gulp.task('dev', gulp.series('devsass', 'server', 'watch'));
gulp.task('buildcss', function() {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./build/css'))
});
gulp.task('buildjs', function() {
    return gulp.src('./src/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./build'))
});
gulp.task("libsjs", function() {
    return gulp.src("./src/js/*.js")
        .pipe(gulp.dest("./build/js"))
});
gulp.task("buildhtml", function() {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./build"))
});
gulp.task("build", gulp.parallel("buildcss", "buildjs", "libsjs", "buildhtml"));