module.exports = function(deployTarget) {  
  var ENV = {};
  ENV.pagefront = {
    app: 'noovis2',
    key: process.env.PAGEFRONT_KEY
  };

  return ENV;
};
