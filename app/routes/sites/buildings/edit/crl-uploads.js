import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let building = this.modelFor('sites.buildings.edit').building;
    return building.get('sheets');
  }
});
