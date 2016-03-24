import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  beforeModel(transition) {
    let target = transition.targetName;
    if (target === 'sites.buildings.edit.index') {
      this.transitionTo('sites.buildings.edit.map');
      return;
    }
    this.transitionTo(target);
  },
  
  model(params) {
    return RSVP.hashSettled({
      building: this.store.findRecord('building', params.building_id),
    }).then(results => {
      return {
        building: results.building.value,
      };
    }).catch(({ error }) => {
      this.set('error', error);
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
