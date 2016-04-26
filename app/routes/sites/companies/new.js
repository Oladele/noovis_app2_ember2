import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  beforeModel() {
    if (!this.can('write company')) {
      this.transitionTo('sites');
    }
  },

  model() {
    return this.store.createRecord('company');
  },

  actions: {
    createCompany(company, name) {
      company.set('name', name);
      return company.save();
    }
  }
});
