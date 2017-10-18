 "use strict";
const gulp = require('gulp'),
      pug = require('gulp-pug'),
      postcss = require('gulp-postcss'),
      sass = require('gulp-sass'),
      webserver = require('gulp-webserver'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin');

/***************************************************/
/*Variables*/
/**************************************************/
const pugDest = 'dist',
      pugFolder = 'src/pug/*.pug',
      sassFolder = 'src/sass/*.sass',
      sassDest = 'dist/style';

/***************************************************/
/*Originators are herre*/
/**************************************************/
gulp.task('imgmin',function(){
  gulp.src('src/img/*')
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({plugins: [{removeViewBox: true}]})],
        { verbose: 'true'}
      ))
      .pipe(gulp.dest('dist/img'))
});

gulp.task('webserver', function(){
  gulp.src('dist')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      open: true,
      fallback: 'hello.html',
    }));
});

gulp.task('pug', function(){
  gulp.src(pugFolder)
  .pipe(pug({pretty: true}))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(pugDest))
});

gulp.task('watch-templates', function(){
  gulp.watch('src/**/*.pug',['pug'])
});

gulp.task('sass', function(){
  var plugins = [
    autoprefixer(),
    //cssnano(),
  ];
  gulp.src(sassFolder)
  .pipe(sass())
  .pipe(postcss(plugins))
  .pipe(gulp.dest(sassDest))
});


/**************************************************/
/*watch squad*/
/**************************************************/

gulp.task('watch-pug', function(){
  gulp.watch(pugFolder,['pug'])
});

gulp.task('watch-sass',function(){
  gulp.watch(sassFolder,['sass'])
});



/**************************************************/
/*default*/
/**************************************************/

gulp.task('default',[
  'pug',
  'sass',
  'watch-pug',
  'watch-sass',
  'watch-templates'
]);
