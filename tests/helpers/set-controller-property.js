import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('setControllerProperty', function(app, controllerName, prop, value) {
  let controller = app.__container__.lookup(`controller:${controllerName}`);
  controller.set(prop, value);
});
