import Ember from 'ember';
import config from '../config/environment';

const {
  inject,
  RSVP
} = Ember;

export default Ember.Route.extend({
  ajax: inject.service(),
  model() {
    console.log("config.environment:", config.environment);
    console.log("config.apiHost:", config.apiHost);

    return RSVP.hash({
      companies: this.store.findAll('company'),
      sites: this.store.findAll('networkSite'),
      buildings: this.store.findAll('building'),
      global: this.get('ajax').request('global')
    });
  },

  afterModel(model) {
    model.nodeCounts = model.global.data.attributes['node-counts'];
    delete model.global;
  }
});
