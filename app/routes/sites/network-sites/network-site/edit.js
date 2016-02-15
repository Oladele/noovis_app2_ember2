import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      site: this.modelFor('sites.network-sites.network-site'),
      buildings: this.modelFor('sites.network-sites.network-site').get('buildings')
    });
  },

  actions: {
    submit(data) {
      const site = this.modelFor(this.routeName).site;
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
      return this.modelFor(this.routeName).site.destroyRecord();
    }
  }
});
