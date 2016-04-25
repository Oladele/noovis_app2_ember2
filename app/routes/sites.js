import Ember from 'ember';
import config from '../config/environment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  inject: { service },
  RSVP
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: service(),

  model() {
    console.log("config.environment:", config.environment);
    console.log("config.apiHost:", config.apiHost);
    let global = this.get('ajax').request('global')
      .then(results => results, () => {
        return {
          data: {
            attributes: {
              "node-counts": []
            }
          }
        };
      });

    return RSVP.hash({
      companies: this.store.findAll('company'),
      sites: this.store.findAll('networkSite'),
      buildings: this.store.findAll('building'),
      global
    });
  },

  afterModel(model) {
    model.nodeCounts = model.global.data.attributes['node-counts'];
    delete model.global;
  }
});
