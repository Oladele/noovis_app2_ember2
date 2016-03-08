import Ember from 'ember';

const {
  isEmpty
} = Ember;

export default Ember.Component.extend({
  options: {
    layout: {
      hierarchical: true
    }
  },

  init() {
    this._super(...arguments);
    let hasNoData = isEmpty(this.get('nodes')) || isEmpty(this.get('edges'));
    if (hasNoData) {
      return;
    }

    let nodes = new vis.DataSet(this.get('nodes'));
    this.set('nodes', nodes);
    let edges = new vis.DataSet(this.get('edges'));
    this.set('edges', edges);
  },

  didInsertElement() {
    this._super(...arguments);
    let hasNoData = isEmpty(this.get('nodes')) || isEmpty(this.get('edges'));
    if (hasNoData)  {
      return;
    }

    let container = this.$('[data-test-selector="network-tree-container"]')[0];
    this.set('container', container);
    let nodes = this.get('nodes');
    let edges = this.get('edges');
    let options = this.get('options');
    let data = { nodes, edges };

    new vis.Network(container, data, options);
  },

  didReceiveAttrs() {
    this._super(...arguments);
  }
});
