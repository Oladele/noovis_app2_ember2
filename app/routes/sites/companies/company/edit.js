import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    updateCompany(name) {
      const company = this.modelFor(this.routeName);
      company.set('name', name);
      return company.save();
    },

    deleteCompany() {
      return this.modelFor(this.routeName).destroyRecord();
    }
  }
});
