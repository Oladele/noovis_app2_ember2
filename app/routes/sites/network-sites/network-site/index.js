import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('sites.network-sites.network-site.edit');
  }
});
