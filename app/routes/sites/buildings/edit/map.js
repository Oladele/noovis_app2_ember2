import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    let id = this.paramsFor('sites.buildings.edit').building_id;
    return RSVP.hash({
      building: this.store.findRecord('building', id)
    });
  }
});
