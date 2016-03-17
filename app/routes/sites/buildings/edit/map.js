import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let id = this.paramsFor('sites.buildings.edit').building_id;
    return this.store.findRecord('building', id);
  }
});
