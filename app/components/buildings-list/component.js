import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteBuilding(building) {
      this.get('onBuildingDelete')(building)
        .catch(({ errors }) => this.set('errors', errors));
    }
  }
});
