const gulp = require('gulp');
const dotenv = require('dotenv');

dotenv.config({path: '.env.local'});

gulp.task('copyPollABI', () => {
  return gulp.src(process.env.VUE_APP_POLL_ABI_PATH)
    .pipe(gulp.dest('./src/abi'));
});

gulp.task('default', gulp.series('copyPollABI')  )
