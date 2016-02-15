import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      site: this.modelFor('sites.network-sites.network-site'),
      buildings: this.modelFor('sites.network-sites.network-site').get('buildings'),
      building: this.store.createRecord('building')
    });
  },

  actions: {
    addBuildingMarker(event) {
      let latLng = event.latLng;
      let controller = this.controller;
      if (typeof latLng === 'object') {
        let bLat = latLng.lat();
        let bLng = latLng.lng();
        let marker = {
          id: 'currentBuilding',
          lat: bLat,
          lng: bLng,
          draggable: true,
          dragend(event) {
            controller.set('bLat', event.latLng.lat());
            controller.set('bLng', event.latLng.lng());
          },
          icon: 'assets/fa-home_40_blue.png'
        };

        controller.set('bLat', bLat);
        controller.set('bLng', bLng);
        controller.set('currentMarker', marker);
      }
    },

    createBuilding(params) {
      let { building, name, description, lat, lng } = params;
      building.setProperties({ name, description, lat, lng });

      return building.save()
        .then(building => this.transitionTo('sites.buildings.edit', building.id))
        .catch(({ errors }) => this.controller.set('errors', errors));
    }
  }
});
