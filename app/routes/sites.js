import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('company');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      lat: 37.0625,
      lng: -95.677068,
      zoom: 4
    });

    let markers = Ember.A();
    model.forEach(company => {
      company.get('networkSites').then(sites => {
        let results = sites.map(site => {
          return {
            id: site.get('id'),
            lat: site.get('lat'),
            lng: site.get('lng'),
            infoWindow: {
              content: site.get('name')
            }
          };
        });
        markers.pushObjects(results);
      });
    });
    controller.set('markers', markers);
  }
});
