var gulp = require("gulp");
var gutil = require("gulp-util");
var notify = require("gulp-notify");

var browserSync = require("browser-sync");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");


var baseFolder = "src/";



gulp.task("styles", function() {
	gulp.src("src/scss/**/*.scss")
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(["last 15 versions"]))
	.pipe(gulp.dest("src/css"))
	.pipe(browserSync.stream())
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: true,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "temphome.me", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task("watch", ["styles", "browser-sync"], function() {
	gulp.watch("src/scss/**/*.scss", ['styles']);
	gulp.watch('src/**/*.html', browserSync.reload);
})

gulp.task("default", ["watch"])