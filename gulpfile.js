const { src, dest, watch, series, parallel } = require('gulp');

// CSS & SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// IMG
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


//compilador
function css() {

    return src('src/scss/app.scss')                         //1- identificar archivo
        .pipe( sass(  ) )                                   //2- compilar
        .pipe(postcss( [autoprefixer(  )] ))                // -compatibilidad-
        .pipe( dest('build/css') )                          //3- guardar el .css

}

//optimizar imagen
function img() {

    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest( 'build/img' ) )

}

//webpizar imagen
function versionWebp() {

    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest( 'build/img' ))

}

//avificar imagen
function versionAvif() {

    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest( 'build/img' ))

}

//live server
function dev() {

    watch( 'src/scss/**/*.scss', css )  //actualizador general
    watch( 'src/img/**/*', img )

}

exports.css = css;
exports.dev = dev;
exports.img = img;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

exports.default = series( img, versionWebp, versionAvif, css, dev );

//series - Se inicia una, finaliza, inicia la siguiente

//parallel - Las tareas comienzan a la vez