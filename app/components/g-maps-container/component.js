import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  lat: 37.0625,
  lng: -95.677068,
  zoom: 4,
  markers: computed.map('model', function(site) {
    return {
      id: site.get('id'),
      lat: site.get('lat'),
      lng: site.get('lng'),
      infoWindow: {
        content: site.get('name')
      }
    };
  })
});
