import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    let model = this.get('model');
    this.set('columns', model.columns);
    this.set('content', model.content);
  }
});
