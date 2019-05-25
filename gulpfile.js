var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var babelify = require('babelify');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

//TODO: add task to copy fonts
//Copy images 
gulp.task('copyfile', function(){
gulp.src('src/assets/images/**.{jpg,jpeg,png,gif,svg}').pipe(gulp.dest('dist/assets/images'))
.pipe(connect.reload());
console.log("Images copied!");
});

//copy audios
gulp.task('copyaudios', function(){
gulp.src('src/assets/media/**.{mp3,wav,mp4,wv}').pipe(gulp.dest('dist/assets/media'))
.pipe(connect.reload());
console.log("Audios copied!");
});

//copy json files
gulp.task('copyjson', function(){
gulp.src('src/js/data/**.json').pipe(gulp.dest('dist/js/data/'))
.pipe(connect.reload());
console.log("json data copied!");
});

//process sass/scss files
gulp.task('sass',function(){
  return gulp.src('src/sass/style.{scss,sass}')
  .pipe(sass()).pipe(gulp.dest('dist/css'))
  .pipe(connect.reload());s
});

// ['dependance task'] always is launch first.
gulp.task('start_watch',function(){
gulp.watch('src/sass/*.{scss,sass}', ['sass']);
gulp.watch('src/pug/*.pug', ['convert']);
gulp.watch('src/js/*.js', ['browserify']);
gulp.watch('src/js/data/**.json', ['copyjson']);
gulp.watch('src/assets/images/**.{png,jpg,svg,gif}', ['copyfile']);
gulp.watch('src/assets/audio/**.{mp3,wav,mp4,wv}', ['copyaudios'])
});

gulp.task('convert', function(){
  return gulp.src(['src/pug/**.pug','!src/pug/_*.pug'])
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dist/'))
  .pipe(connect.reload());
});

 gulp.task('browserify', function() {
    return browserify({entries: ['src/js/index.js']}).transform(babelify.configure({
        presets : ["es2015"]
        })).bundle()
        // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source('index.min.js')) // Desired filename
        // Output the file
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});
gulp.task('init',['convert','browserify','sass']);

gulp.task('connect', function(){
  connect.server({
    name: "profile_material_design", 
    root: 'dist/',
    port: '3000',
    livereload: true,
  });
});

gulp.task('default', ['init','connect','start_watch','copyfile','copyaudios']);
gulp.task('load', ['start_watch','copyfile','copyaudios']);
