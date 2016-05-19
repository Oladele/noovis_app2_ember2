import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('sites.companies.company.edit');
  }
});
