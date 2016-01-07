import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateCompany(name) {
      const company = this.get('model');
      company.set('name', name);
      return company.save();
    },

    deleteCompany() {
      return this.get('model').destroyRecord();
    }
  }
});
