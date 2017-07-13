var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var inject = require("gulp-inject");
var connect = require("gulp-connect");
var imagemin = require("gulp-imagemin");
var watch = require("gulp-watch");

gulp.task("default",["sass","javascript","html","img","watch","fuwuqi"]);

gulp.task("sass", function(){
	gulp.src("resource/scss/**/*.scss")
	.pipe(concat("all.scss"))
	.pipe(sass())
	.pipe(cleanCSS())
	.pipe(rename("all.min.css"))
	.pipe(gulp.dest("dest/css"))
	.pipe(connect.reload());
});


gulp.task("javascript",function(){
	gulp.src("resource/js/**/*.js")
	.pipe(concat("all.js"))
	.pipe(uglify())
	.pipe(rename("all.min.js"))
	.pipe(gulp.dest("dest/js"))
	.pipe(connect.reload());
});

gulp.task("html",function(){
	gulp.src("resource/index.html")
	.pipe(gulp.dest("dest/"))
	.pipe(inject(gulp.src(["./dest/css/all.min.css","./dest/js/all.min.js"]),{relative:true}))
	.pipe(gulp.dest("dest/"))
	.pipe(connect.reload());
});

gulp.task("img",function(){
	gulp.src("resource/images/*")
	.pipe(imagemin())
	.pipe(gulp.dest("dest/images"));
})

gulp.task("fuwuqi",function(){
	connect.server({
		port:8888,
		root:"dest",
		livereload:true
	});
});

gulp.task("watch",function(){
	gulp.watch(["./resource/**/*.html"],["html"]);
	gulp.watch(["./resource/**/*.scss"],["sass"]);
	gulp.watch(["./resource/**/*.js"],["javascript"]);
	watch("resource/images/*",function(){
		gulp.src("resource/images/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dest/images"));
	})
});



