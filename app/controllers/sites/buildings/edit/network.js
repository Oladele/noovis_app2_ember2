import Ember from 'ember';

const {
  computed,
  isEmpty
} = Ember;

export default Ember.Controller.extend({
  runNodes: computed('model.nodes.[]', 'filterIds', function() {
    let nodes = this.get('model.nodes');
    let ids = this.get('filterIds');

    return nodes.filter(node => ids.includes(node.cable_run_id.toString()));
  }),

  filteredGraph: computed('filterIds', 'model.nodes.[]', 'model.edges.[]', function() {
    let { nodes, edges } = this.get('model');
    let ids = this.get('filterIds');
    if (isEmpty(ids)) {
      return { edges, nodes };
    }

    let branch = this.get('runNodes');
    if (isEmpty(branch)) {
      return { edges, nodes };
    }

    let shallowestNode = findShallowestNode(branch);
    let ancestors = findAllAncestors(shallowestNode, nodes);
    branch.push(...ancestors);

    return { edges, nodes: branch };
  }),

  tableHeaders: computed('model.cableRuns.[]', function() {
    let cableRun = this.get('model.cableRuns.firstObject');
    if (cableRun) {
      let keys = Object.keys(cableRun.toJSON());
      let sheetIndex = keys.indexOf('sheet');
      return keys.slice(0, sheetIndex);
    } else {
      return ['No sheets uploaded'];
    }
  }),

  actions: {
    filterGraph(id) {
      this.set('filterIds', [id]);
    }
  }
});

function findShallowestNode(tree) {
  return tree.sortBy('node_level')[0];
}

function findAllAncestors(node, tree) {
  let nodes = [];
  while (node.node_level > 1) {
    let parent = tree.findBy('id', node.parent_id);
    nodes.push(parent);
    node = parent;
  }
  return nodes;
}
