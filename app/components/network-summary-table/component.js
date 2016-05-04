import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectRow(id) {
      this.set('selectedId', id);
      this.get('onSelect')(id);
    }
  }
});
