import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    submit(data) {
      const site = this.modelFor(this.routeName);
      site.setProperties(data);

      return site.save();
    },

    didUpdatePlace(place) {
      this.controller.setProperties({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        zoom: 16,
        place
      });
    },

    deleteNetworkSite() {
      return this.modelFor(this.routeName).destroyRecord();
    }
  }
});
