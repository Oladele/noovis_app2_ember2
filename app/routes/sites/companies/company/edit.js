import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      lat: 37.0625,
      lng: -95.677068,
      zoom: 4
    });
  },

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
