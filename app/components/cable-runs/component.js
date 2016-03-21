import Ember from 'ember';

const {
  observer
} = Ember;

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    let model = this.get('model');
    this.set('columns', model.columns);
    this.set('content', model.content);
  },
  selection: [],
  rowSelected: observer('selection', function() {
    let selection = this.get('selection');
    let ids = selection.map(cableRun => cableRun.get('id'));
    this.get('onSelect')(ids);
  }),

  actions: {
    clearSelection() {
      this.set('selection', []);
    }
  }
});
