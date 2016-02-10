import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  lat: 37.0625,
  lng: -95.677068,
  zoom: 4,
  markers: computed.map('model', function(marker) {
    return {
      id: marker.get('id'),
      lat: marker.get('lat'),
      lng: marker.get('lng'),
      infoWindow: {
        content: marker.get('name')
      }
    };
  })
});
