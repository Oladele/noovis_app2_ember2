import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createCompany(name) {
      return this.store.createRecord('company', {
        name
      }).save();
    }
  }
});
