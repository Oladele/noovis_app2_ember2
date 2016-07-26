module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'noovis2-staging',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
