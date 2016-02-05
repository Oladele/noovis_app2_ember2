import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 37.0625,
  lng: -95.677068,
  zoom: 4,

  actions: {
    didUpdatePlace(location) {
      this.setProperties({
        lat: location.lat(),
        lng: location.lng(),
        zoom: 16
      });
    }
  }
});
