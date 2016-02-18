var appRoot = 'src/';
var outputRoot = 'dist/';
var exportSrvRoot = 'export/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  sourceJsx: appRoot + '**/*.jsx',
  html: appRoot + '**/*.html',
  font: 'assets/fonts/**/*',
  style: ['assets/styles/**/*.scss', 'assets/styles/**/*.css'],
  image: 'assets/images/**/*',
  output: outputRoot,
  exportSrv: exportSrvRoot,
  fontOutput: outputRoot + 'assets/fonts',
  styleOutput: outputRoot + 'assets/styles',
  imageOutput: outputRoot + 'assets/images',
  e2eSpecsSrc: 'test/e2e/src/**/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
