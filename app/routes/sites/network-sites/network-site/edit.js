import Ember from 'ember';

const {
  RSVP,
  inject
} = Ember;

export default Ember.Route.extend({
  ajax: inject.service(),
  model() {
    return RSVP.hash({
      site: this.modelFor('sites.network-sites.network-site'),
      buildings: this.modelFor('sites.network-sites.network-site').get('buildings')
    });
  },

  actions: {
    submit(data) {
      let flash = this.get('flashMessages');
      const site = this.modelFor(this.routeName).site;
      site.setProperties(data);

      return site.save()
        .then(() => flash.success('Network site was updated.'))
        .catch(errors => flash.warning(errors));
    },

    didUpdatePlace(place) {
      this.controller.setProperties({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        zoom: 16,
        place
      });
    },

    deleteNetworkSite(site) {
      return site.destroyRecord();
    },

    deleteBuilding(building) {
      return building.destroyRecord();
    }
  }
});
