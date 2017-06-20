//1、加载gulp包
var gulp = require("gulp");
//引入sass插件对应的模块
var sass = require("gulp-sass");
//引入合并文件对应的模块
var concat = require("gulp-concat");
//引入压缩的模块
var uglify = require("gulp-uglify");
//引入重命名的模块
var rename = require("gulp-rename");
//引入压缩CSS的模块
var minifycss = require('gulp-minify-css');
var imagemin=require('gulp-imagemin');


//2、写个copy文件的任务
gulp.task("copy-index",function(){
	gulp.src("*.html").pipe(gulp.dest("dist"));
	//把开发的代码部署到服务器上。
//	gulp.src("dist/**/*").pipe(gulp.dest("dist"));
});

gulp.task("copy-images",function(){
	gulp.src("img/**/*").pipe(gulp.dest("dist/img"));
});
gulp.task("copy-js",function(){
	gulp.src("js/**/*").pipe(gulp.dest("dist/js"));
});

//

//sass编译任务
gulp.task("sass",function(){
	gulp.src("css/*.scss")//源文件
	.pipe(sass())//做sass预编译（做什么样的处理）
	.pipe(gulp.dest("dist/css"));//把结果放在何处。
	
});


//合并
/*gulp.task("concatJS",function(){
	gulp.src(["js/index.js","js/goodsList.js"])
	.pipe(concat("all.js"))
	.pipe(gulp.dest("dist/js"));
});

//合并并压缩
gulp.task("uglify",function(){
	gulp.src(["js/index.js","js/goodsList.js"])
	.pipe(concat("all.js"))//合并
	.pipe(uglify())//压缩
	.pipe(gulp.dest("dist/js"));
});

//合并，压缩，重命名
gulp.task("concatuglifyrename",function(){
	gulp.src(["js/index.js","js/goodsList.js"])
	.pipe(concat("all.js"))//合并
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())//压缩
	.pipe(rename("all.min.js"))
	.pipe(gulp.dest("dist/js"));
});

*/
//合并并压缩
gulp.task("uglify",function(){
	gulp.src("js/publicIndex.js")
	.pipe(uglify())//压缩
	.pipe(gulp.dest("dist/js"));
});
gulp.task("minifycss",function(){
	gulp.src("css/*.scss")
	.pipe(sass())
	.pipe(minifycss())//压缩
	.pipe(gulp.dest("dist/css"));
});
gulp.task("images",function(){
	gulp.src(["img/**/*"])
	.pipe(imagemin())
	.pipe(gulp.dest("dist/img"))
})

gulp.task("watchAll",function(){
	gulp.watch("*.html",["copy-index"]);
	gulp.watch("css/*.scss",["sass"]);
	gulp.watch("img/**/*",["copy-images"]);
	gulp.watch("js/**/*",["copy-js"]);
});
