import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model() {
    console.log("config.environment:", config.environment);
    console.log("config.apiHost:", config.apiHost);

    return Ember.RSVP.hash({
      companies: this.store.findAll('company'),
      sites: this.store.findAll('networkSite')
    });
  }
});
