import Ember from 'ember';

const {
  inject,
  RSVP
} = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  ajax: inject.service(),
  model(params) {
    return RSVP.hash({
      building: this.store.findRecord('building', params.building_id),
      // networkTreeData: this.get('ajax').request(`/buildings/${params.building_id}/show_network_graph`)
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
    },

    sendFlash(status, message) {
      let flashMessages = this.get('flashMessages');
      if (status >= 200 && status < 300) {
        let text = message || 'Success';
        flashMessages.success(text);
        return;
      }

      if (status >= 400 && status < 500) {
        let text = message || 'Client Error';
        flashMessages.warning(text);
        return;
      }

      if (status >= 500) {
        flashMessages.warning('Server Error: Please try again later');
        return;
      }
    }
  }
});
