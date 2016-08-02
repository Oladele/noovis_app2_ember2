import Ember from 'ember';

const {
  RSVP: { hash },
  isPresent
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
    return hash({
      building: this.store.findRecord('building', params.building_id),
    })
    .catch(({ errors }) => this.set('errors', errors));
  },

  afterModel(model, transition) {
    let message = model.building.get('importJobMessage');
    if (isPresent(message)) {
      let flashMessages = this.get('flashMessages');
      flashMessages.info(message, {
        sticky: true
      });
    }
  },

  breadCrumb: {
    title: 'Building'
  },

  actions: {
    submit(params) {
      let flash = this.get('flashMessages');
      let { building, name, description, lat, lng } = params;
      building.setProperties({ name, description, lat, lng });
      return building.save()
        .then(() => flash.success('Building was updated.'))
        .catch(errors => flash.warning(errors));
    },

    destroyBuilding(building) {
      let siteId = building.get('networkSite.id');
      return building.destroyRecord()
        .then(() => this.transitionTo('sites.network-sites.network-site', siteId))
        .catch(response => console.log(response));
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
