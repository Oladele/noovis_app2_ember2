import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  headers: computed('cableRuns', function() {
    let cableRun = this.get('cableRuns.firstObject');
    if (cableRun) {
      let keys = Object.keys(cableRun.toJSON());
      let sheetIndex = keys.indexOf('sheet');
      return keys.slice(0, sheetIndex);
    } else {
      return ['No sheets uploaded'];
    }
  }),

  actions: {
    selectRow(id) {
      this.set('selectedId', id);
      this.get('onSelect')(id);
    }
  }
});
