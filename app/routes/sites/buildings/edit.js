import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('building', params.building_id);
  },

  actions: {
    submit(building, name, description) {
      building.setProperties({ name, description });
      return building.save();
    }
  }
});
