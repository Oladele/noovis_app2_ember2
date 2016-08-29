import Ember from 'ember';

export default Ember.Component.extend({
  containerSelector: 'network-tree-container',
  options: {
    layout: {
      hierarchical: {
        nodeSpacing: 200,
        direction: 'LR'
      }
    },
    physics: {
      enabled: false
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
    let selector = `.${this.containerSelector}`;
    let container = this.$(selector)[0];
    let data = { nodes: [], edges: [] };
    let options = this.get('options');
    let visNetwork = new vis.Network(container, data, options);
    this.set('visNetwork', visNetwork);
  },
});
