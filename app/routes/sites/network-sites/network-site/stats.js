import Ember from 'ember';

const {
  RSVP: { hash }
} = Ember;

export default Ember.Route.extend({
  model(params) {
    let { id } = this.modelFor('sites.network-sites.network-site');
    let networkElementCount = this.store.queryRecord('networkElementCount', {
      networkId: id }
    );

    return hash({
      networkElementCount,
    });
  }
});
