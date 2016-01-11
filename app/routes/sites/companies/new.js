import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createCompany(name) {
      return this.store.createRecord('company', {
        name
      }).save();
    }
  }
});
