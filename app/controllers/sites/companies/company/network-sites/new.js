import Ember from 'ember';

export default Ember.Controller.extend({
  latitude: 37.0625,
  longitude: -95.677068,
  zoom: 4,

  actions: {
    didUpdatePlace(location) {
      this.setProperties({
        latitude: location.lat(),
        longitude: location.lng(),
        zoom: 16
      });
    }
  }
});
