import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  buildingMarker: computed('model', function() {
    let building = this.get('model');
    this.set('bLat', building.get('lat'));
    this.set('bLng', building.get('lng'));
    const dragend = (event) => {
      this.set('bLat', event.latLng.lat());
      this.set('bLng', event.latLng.lng());
    };
    let data = {
      id: building.get('id'),
      lat: building.get('lat'),
      lng: building.get('lng'),
      infoWindow: {
        content: building.get('name')
      },
      icon: 'assets/fa-home_40.png',
      draggable: true,
      dragend
    };

    return Ember.A([data]);
  })
});
