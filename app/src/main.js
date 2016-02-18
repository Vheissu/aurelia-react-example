export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('components')
    .developmentLogging();

  aurelia.start().then(a => a.setRoot());
}
