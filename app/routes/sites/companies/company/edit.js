import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      lat: 37.0625,
      lng: -95.677068,
      zoom: 4
    });

    model.get('networkSites').then(sites => {
      let markers = sites.map(site => {
        return {
          id: site.get('id'),
          lat: site.get('lat'),
          lng: site.get('lng'),
          infoWindow: {
            content: site.get('name')
          }
        };
      });
      controller.set('markers', markers);
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
