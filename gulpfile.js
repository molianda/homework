var gulp = require('gulp');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var ugli = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
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
gulp.task('dev', gulp.series('devsass', 'watch'));