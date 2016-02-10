import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      site: this.modelFor('sites.network-sites.network-site'),
      building: this.store.createRecord('building')
    });
  },

  actions: {
    addBuildingMarker(event) {
      console.log(event);
    },

    createBuilding(building, name, description) {
      building.setProperties({ name, description });

      return building.save();
    }
  }
});
