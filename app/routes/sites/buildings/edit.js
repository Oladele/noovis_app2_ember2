import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('building', params.building_id);
  },

  actions: {
    submit(params) {
      let { building, name, description, lat, lng } = params;
      building.setProperties({ name, description, lat, lng });
      return building.save();
    },

    destroyBuilding(building) {
      return building.destroyRecord();
    }
  }
});
