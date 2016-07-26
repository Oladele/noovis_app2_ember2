module.exports = function(deployTarget) {  
  let stagingName = 'noovis2-staging';
  let productionName = 'noovis2-production';

  return {
    pagefront: {
      app: stagingName,
      key: process.env.PAGEFRONT_KEY
    }
  };
};
