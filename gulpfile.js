var gulp = require('gulp');
var shell = require('gulp-shell')

gulp.task('default', shell.task([
  'git add .',
  'git commit -m'
]));
