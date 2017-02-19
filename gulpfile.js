let gulp = require('gulp');
let webpack = require('webpack-stream');
let webpackConfig = require('./webpack.config.js');
let del = require('del');
let nodemon = require('gulp-nodemon');
let babel = require('gulp-babel');

// Development Tasks
// -----------------

gulp.task('clean', () =>
  del(['dist/**/*'])
);

gulp.task('build', ['build-client', 'build-server']);

gulp.task('build-server', () =>
  gulp.src(['./src/server/**/*.*'])
      .pipe(babel())
      .pipe(gulp.dest('dist/server/'))
);

gulp.task('build-client', () =>
  gulp.src('./src/client/js/client.js')
      .pipe(webpack(webpackConfig))
      .on('error', function handleError() {
        this.emit('end'); // Recover from errors
      })
      .pipe(gulp.dest('./dist/'))
);

gulp.task('watch', ['build'], () => {
  gulp.watch(['./src/client/**/*.*'], ['build-client']);
  gulp.watch(['./src/server/**/*.*'], ['build-server']);
  //gulp.watch(['src/shared/**/*.*'], ['build-server', 'build-client']);
  gulp.start('run');
});

gulp.task('run', () => {
  nodemon({
    delay: 10,
    script: './dist/server/server.js',
    // args: ["config.json"],
    ext: 'js',
    watch: 'src'
  })
});
