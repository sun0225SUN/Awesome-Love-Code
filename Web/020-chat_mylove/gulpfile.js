var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var jade        = require('gulp-jade');
var babel       = require('gulp-babel');
var minify      = require('gulp-minify');
var browserSync = require('browser-sync').create();

/**
 * Compile files from _style into css
 */
gulp.task('sass', function () {
    return gulp.src('css/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: function(e) {
                console.error(e);
            },
            outputStyle: 'compressed'
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

/**
 * compile es6
 */
gulp.task('babel', function () {
    gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(minify())
        .pipe(gulp.dest('js'));
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', ['sass', 'babel'], function () {
    gulp.watch('css/*.scss', ['sass'])
        .on('change', browserSync.reload);

    gulp.watch('src/*.js', ['babel'])
        .on('change', browserSync.reload);
});

/**
 * sync with browser
 */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: '.'
    });
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['watch', 'browser-sync']);
