var gulp = require('gulp');
var rename = require('gulp-rename');
var imageResize = require('gulp-image-resize');
var parallel = require('concurrent-transform');
var os = require('os');

var imageSizes = [256, 512, 1024, null];

const SRC_FOLDER = 'images';
const DEST_FOLDER = 'images_out';
const PARALLEL_AMOUNT = os.cpus().length;

gulp.task('default', () => {
    for (var i = 0; i < imageSizes.length; i++) {
        let imageSize = imageSizes[i];
        gulp.src(`${SRC_FOLDER}/**/*.{jpg,png,svg,webp}`)
            .pipe(parallel(
                imageResize({
                    width: imageSize || 0,
                    format: 'jpg',
                    upscale: true,
                    quality: 0.7,
                    flatten: true
                }), PARALLEL_AMOUNT))
            .pipe(rename((path) => {
                if (imageSize) {
                    path.basename += `_x${imageSize}`;
                }
            }))
            .pipe(gulp.dest(DEST_FOLDER));
    }
});
