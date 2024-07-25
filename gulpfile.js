import gulp from "gulp";
import browser_sync from "browser-sync";
import gulp_sass from "gulp-sass";
import * as sass_compiler from 'sass';
import pug from "gulp-pug";
import changed from "gulp-changed";

const sass = gulp_sass(sass_compiler);

function task_copy_files() {
    return gulp.src([
                "src/**",
                "!src/**/*.scss",
                "!src/**/*.pug",
            ], {
                base: "src"
            }
        )
        .pipe(changed("dist"))
        .pipe(gulp.dest("dist/"))
        .pipe(browser_sync.reload({stream: true}));
}

function task_pug() {
    return gulp.src(
            "src/**/*.pug",
            {
                base: "src",
            }
        )
        .pipe(changed("dist"))
        .pipe(pug())
        .pipe(gulp.dest("dist/"))
        .pipe(browser_sync.reload({stream: true}));
}

function task_sass() {
    return gulp.src(
            "src/**/*.scss",
            {
                base: "src",
            }
        )
        .pipe(changed("dist"))
        .pipe(sass())
        .pipe(gulp.dest("dist/"))
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
            baseDir: "./dist"
        }
    });
    done();
}

function task_watch() {
    gulp.watch("./src/**/*", task_compile);
}

export default gulp.series(
    task_compile,
    task_server,
    task_watch,
);
