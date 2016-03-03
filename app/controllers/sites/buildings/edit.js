import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  sheetNames: ['Please upload a workbook'],
  buildingMarker: computed('model.building', function() {
    let building = this.get('model.building');
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

    return [data];
  })
});
