import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('company');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      lat: 37.0625,
      lng: -95.677068,
      zoom: 4
    });
  }
});
