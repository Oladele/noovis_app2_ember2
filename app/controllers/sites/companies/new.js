import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createCompany() {
      const name = this.get('name');
      this.store.createRecord('company', {
        name
      }).save();
    }
  }
});
