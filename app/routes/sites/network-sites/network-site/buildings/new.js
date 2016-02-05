import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      site: this.modelFor('sites.network-sites.network-site')
    });
  },

  actions: {
    addBuildingMarker(event) {
      console.log(event);
    },

    createBuilding(name, description) {
      this.store.createRecord('building', { name, description })
        .save()
        .catch(({ errors }) => this.controller.set('errors', errors));
    }
  }
});
