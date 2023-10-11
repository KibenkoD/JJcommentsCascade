import { createRequire } from "module";
const require = createRequire(import.meta.url);
const gulp = require('gulp');
const babel = require('gulp-babel');
const fs = require('fs');
const rename = require('gulp-rename');

const concat = require('gulp-concat');

const webserver = require('gulp-webserver');

gulp.task('build:js', function(done) {
    gulp.src(['src/main.js', 'src/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('build/js'));
    gulp.src(['reactApp/indexReact.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('build/js'));

    gulp.src(['node_modules/react/umd/*.js'])
        .pipe(concat('react.js'))
        .pipe(gulp.dest('build/js'));
    gulp.src(['node_modules/react-dom/umd/react-dom.production.min.js'])
        .pipe(concat('react-dom.js'))
        .pipe(gulp.dest('build/js'));

    if (!fs.existsSync('./build/js/app.js')) { // При сборке собираем app.js один раз (only gulp.watch)
        gulp.src(['node_modules/angular/angular.js', 'node_modules/angular-ui-router/release/angular-ui-router.js'])
            .pipe(concat('app.js'))
            .pipe(gulp.dest('build/js'));
    }

    done();
});

gulp.task('build:styles', function (done) {

    gulp.src([
        'styles/css/userComments.css',
        'styles/css/main.css',

    ])
        .pipe(concat('main.css'))
        .pipe(rename({
            suffix: '.min'
         }))
        .pipe(gulp.dest('build/css'));

    gulp.src('styles/css/*.css')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('build/css'));

    done();
});

gulp.task('build:files', function(done) {
    gulp.src(['templates/**', 'images/**'], {base: '.'})
        .pipe(gulp.dest('build'));

    done();
});

gulp.task('webserver', function() {
    gulp.src('./build/').pipe(webserver({
        host: 'localhost',
        port: 8080,
        directoryListing: true,
        livereload: false,
        fallback: 'templates/index.html'

    }));
});

gulp.task('watch:js', function() {
    gulp.watch(['./src/**', './reactApp/**'], gulp.series(['build:js']));
});

gulp.task('watch:files', function() {
    gulp.watch(['./css/**', './images/**', './templates/**','./css/*'], gulp.series(['build:files']));
});

gulp.task('watch:styles', function() {
    gulp.watch(['./styles/**'], gulp.series(['build:styles']));
});

gulp.task('server', gulp.parallel('watch:files', 'watch:js', 'watch:styles', 'webserver'));
