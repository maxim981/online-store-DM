let project_folder	="dist";												
let source_folder 	= "app";			

let path = {
	build: {										
		html: project_folder + "/",					
		css: project_folder + "/css/",				
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
		video: project_folder + "/video/",
	},		
	app: {											
		
		html: source_folder + "/[^_]*.html",		
		// css: source_folder + "/scss/style.scss",	
		css: source_folder + "/scss/*.scss",	
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/**/*",
		video: source_folder + "/video/**/*.mp4",
	},
	watch: {																
		html: source_folder + "/**/*.html",
		css: source_folder + "/scss/**/*.scss",		
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		video: source_folder + "/video/**/*.mp4",

	},

	clean: "./" + project_folder + "/"										
}


let {src, dest} 		= require('gulp'),									
		gulp			= require('gulp'),									
		browsersync		= require('browser-sync').create(),					
		del				= require('del'),
		scss			= require('gulp-sass'),
		autoprefixer 	= require('gulp-autoprefixer'),
		clean_css		= require('gulp-clean-css'),
		rename 			= require('gulp-rename'),
		imagemin		= require('gulp-imagemin'),
		terser			= require('gulp-terser');

function clean(params) {													
	return del(path.clean);													
}


function browserSync(params) {												
	browsersync.init({
		injectChanges: false,						//решает конфликт browsersync и sass
		server: {
			baseDir: "./" + project_folder + "/"							
		},
		port: 3000,
		notify: false,
		browser: 'C:\\Program Files\\Firefox Developer Edition\\firefox.exe'
	})
}


function html() {															
	return src(path.app.html)												
		.pipe(dest(path.build.html))										
		.pipe(browsersync.stream())											
}

function css() {															
	return src(path.app.css)
		.pipe(scss().on('error', scss.logError))									
		.pipe(autoprefixer({
			overrideBrowserlist: ['last 5 versions'],
			cascade: true
			}
		))			
		.pipe(dest(path.build.css))
		.pipe(clean_css())	
		.pipe(rename({extname: '.min.css'}))															
		.pipe(dest(path.build.css))					
		.pipe(browsersync.stream())						
}

function js() {															
	return src(path.app.js)												
		// .pipe(dest(path.build.js))
		.pipe(terser())
		.pipe(rename({extname: '.min.js'}))	
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())		
}

function images() {															
	return src(path.app.img)	
		.pipe(imagemin({
			pogressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3

		}))											
		.pipe(dest(path.build.img))										
		.pipe(browsersync.stream())											
}

function fonts() {
	return src(path.app.fonts) 
		.pipe(dest(path.build.fonts))
}
function video() {
	return src(path.app.video) 
		.pipe(dest(path.build.video))
}



function watchFiles() {														
	gulp.watch([path.watch.html], html);									
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.video], video);

}


let watch = gulp.series(clean, gulp.parallel(html, css, js, images, video, fonts, watchFiles, browserSync));	



									

exports.images = images;
exports.js = js;
exports.css = css;										
exports.html = html;									
exports.watch = watch;									
exports.default = watch;								
