module.exports = function(deployTarget) {  
  var ENV = {};
  if (deployTarget === 'development') {
    ENV.buildEnv = 'development';
    ENV.pagefront = {
      app: 'noovis2-staging',
      key: process.env.PAGEFRONT_KEY
    };
  }

  if (deployTarget === 'staging') {
    ENV.buildEnv = 'production';
    ENV.pagefront = {
      app: 'noovis2-staging',
      key: process.env.PAGEFRONT_KEY
    };
  }

  if (deployTarget === 'production') {
    ENV.pagefront = {
      app: 'noovis2-production',
      key: process.env.PAGEFRONT_KEY
    };
  }

  return ENV;
};
