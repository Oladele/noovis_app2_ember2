import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  headers: computed('data.[]', function() {
    let data = this.get('data');
    return data.map(nodeCount => nodeCount.node_type_pretty);
  }),

  counts: computed('data.@each.count', function() {
    let data = this.get('data');
    return data.map(nodeCount => nodeCount.count);
  })
});
