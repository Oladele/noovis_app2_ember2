import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('setControllerProperty', function(app, controllerName, prop, value, context) {
  let controller = app.__container__.lookup(`controller:${controllerName}`);
  controller.set(prop, value);
});
