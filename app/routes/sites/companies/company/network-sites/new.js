import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    submit(data) {
      const companyId = this.paramsFor('sites.companies.company').id;
      data.company = this.store.peekRecord('company', companyId);
      return this.store.createRecord('network-site', data)
        .save()
        .then(
          site => this.transitionTo('sites.network-sites.network-site.edit', site.id),
          ({ errors }) => errors
        );
      // TODO: confirm correctness
    },

    didUpdatePlace(place) {
      this.controller.setProperties({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        zoom: 16,
        place
      });
    }
  },

  setupController(controller) {
    controller.setProperties({
      draggable: true,
      scrollwheel: true,
      showZoomControl: true,
      showScaleControl: true
    });
  }
});
