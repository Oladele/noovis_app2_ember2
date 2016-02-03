/* jshint node: true */


var contentSecurityPolicy = {
  'script-src': "'self' 'unsafe-eval' 'unsafe-inline' *.googleapis.com maps.gstatic.com",
  'connect-src': "'self' http://localhost:* http://noovis2-staging.herokuapp.com maps.gstatic.com",
  'img-src': "'self' data: *.googleapis.com maps.gstatic.com csi.gstatic.com",
  'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com",
  'font-src': "'self' fonts.gstatic.com"
};

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'noovis-app2-ember2',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    apiHost: '',
    googleMap: {
      apiKey: process.env.GOOGLE_KEY,
      version: '3',
      libraries: ['drawing', 'places']
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = contentSecurityPolicy;
    
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.contentSecurityPolicy = contentSecurityPolicy;
  }

  if (environment === 'production') {
    ENV.apiHost = 'https://noovis2-staging.herokuapp.com';
  }

  return ENV;
};
