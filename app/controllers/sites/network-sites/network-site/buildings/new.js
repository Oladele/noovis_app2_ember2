import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  currentMarker: null,
  buildingMarkers: computed('model.buildings.[]', 'currentMarker', function() {
    let buildings = this.get('model.buildings');
    let data = buildings.map((building) => {
      return {
        id: building.get('id'),
        lat: building.get('lat'),
        lng: building.get('lng'),
        infoWindow: {
          content: building.get('name')
        },
        icon: 'assets/fa-home_40.png'
      };
    });
    let currentMarker = this.get('currentMarker');

    return currentMarker ? data.addObject(currentMarker) : data;
  })
});
