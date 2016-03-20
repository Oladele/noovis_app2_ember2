import Ember from 'ember';

const {
  inject,
  computed,
  isEmpty
} = Ember;

export default Ember.Controller.extend({
  filteredGraph: computed('filterIds', 'model.nodes.[]', 'model.edges.[]', function() {
    let ids = this.get('filterIds');
    let nodes = this.get('model.nodes');
    let edges = this.get('model.edges');
    if (!isEmpty(ids)) {
      nodes = nodes.filter(node => ids.includes(node.cable_run_id.toString()));
    }
    return { edges, nodes };
  }),

  actions: {
    filterGraph(ids) {
      this.set('filterIds', ids);
    }
  }
});
