import Ember from 'ember';

export default Ember.Component.extend({
  options: {
    layout: {
      hierarchical: {
        direction: 'LR'
      }
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    let network = this.get('visNetwork');
    if (network) {
      let nodes = new vis.DataSet(this.get('nodes'));
      let edges = new vis.DataSet(this.get('edges'));
      this.set('nodes', nodes);
      this.set('edges', edges);
      network.setData({ nodes, edges });
    }
  },

  didInsertElement() {
    this._super(...arguments);
    let container = this.$('.network-tree-container')[0];
    let data = { nodes: [], edges: [] };
    let options = this.get('options');
    let visNetwork = new vis.Network(container, data, options);
    this.set('visNetwork', visNetwork);
  },
});
