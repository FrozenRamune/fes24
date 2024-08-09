import gulp from "gulp";
import browser_sync from "browser-sync";
import gulp_sass from "gulp-sass";
import * as sass_compiler from 'sass';
import pug from "gulp-pug";
import changed from "gulp-changed";
import request from "sync-request"
import replace from "gulp-replace";

const sass = gulp_sass(sass_compiler);

function task_fetch_data() {
  const form_answer_url = 'https://script.google.com/macros/s/AKfycbzhAHi2OMeK0q1D5ZIlKL22Isva3ImtMuIPxcvSo58_HnqwE_wsj0PVvUT8ofpf-h20/exec';
  const clubs_str = request('GET', form_answer_url).body.toString().replaceAll('\\n', '\\\\n');
  return gulp.src("src/_page3_data.pug")
    .pipe(replace(/clubs_str ?=.*/, `clubs_str = '${clubs_str}';`))
    .pipe(gulp.dest("src/"))
}

function task_copy_files() {
    return gulp.src([
                "src/**",
                "!src/**/*.scss",
                "!src/**/*.pug",
            ], {
                base: "src",
                encoding: false,
            }
        )
        .pipe(changed("docs"))
        .pipe(gulp.dest("docs/"))
        .pipe(browser_sync.reload({stream: true}));
}

function task_pug() {
    return gulp.src([
                "src/**/*.pug",
                "!src/**/_*.pug",
            ], {
                base: "src",
            }
        )
        .pipe(changed("docs"))
        .pipe(pug({
          pretty: true,
          locals: {
            request,
          }
        }))
        .pipe(gulp.dest("docs/"))
        .pipe(browser_sync.reload({stream: true}));
}

function task_sass() {
    return gulp.src([
                "src/**/*.scss",
                "!src/**/common.scss",
            ], {
                base: "src",
            }
        )
        .pipe(changed("docs"))
        .pipe(sass())
        .pipe(gulp.dest("docs/"))
        .pipe(browser_sync.reload({stream: true}));
}

const task_compile = gulp.parallel(
    task_copy_files,
    task_pug,
    task_sass,
);

function task_server(done) {
    browser_sync({
        server: {
            baseDir: "./docs"
        }
    });
    done();
}

function task_watch() {
    gulp.watch("./src/**/*", task_compile);
}

export default task_compile;

export const fetch_data = task_fetch_data;

export const watch =  gulp.series(
    task_compile,
    task_server,
    task_watch,
);
