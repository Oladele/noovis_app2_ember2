import Ember from 'ember';

const {
  inject,
  RSVP
} = Ember;

export default Ember.Route.extend({
  ajax: inject.service(),
  model(params) {
    return RSVP.hash({
      building: this.store.findRecord('building', params.building_id),
      networkTreeData: this.get('ajax').request(`/buildings/${params.building_id}/show_network_graph`)
    });
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
