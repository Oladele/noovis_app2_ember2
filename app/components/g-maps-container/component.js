import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  lat: 37.0625,
  lng: -95.677068,
  zoom: 4,
  markers: computed.map('model', function(marker) {
    let url = `/sites/buildings/${marker.get('id')}/map`;
    return {
      id: marker.get('id'),
      lat: marker.get('lat'),
      lng: marker.get('lng'),
      infoWindow: {
        content: `<a href=\"${url}\">${marker.get('name')}</a>`
      },
      icon: this.get('icon')
    };
  })
});
