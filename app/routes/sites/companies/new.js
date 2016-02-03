import Ember from 'ember';

export default Ember.Route.extend({
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
