import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    let building = this.modelFor('sites.buildings.edit').building;
    return RSVP.hash({
      building,
      sheets: building.get('sheets')
    });
  }
});
