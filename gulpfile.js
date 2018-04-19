const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const gulpLoadPlugins = require('gulp-load-plugins');

const plugins = gulpLoadPlugins();

const paths = {
  js: [
    './**/*.js', '!node_modules/**/*.js'
  ]
};

gulp.task('serve', [], function (){
    plugins.nodemon({
      script: 'index.js',
      ignore: ['node_modules/**/*.js'],
      tasks: [],
    });
  }
);
