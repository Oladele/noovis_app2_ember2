module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'noovis-frontend',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
