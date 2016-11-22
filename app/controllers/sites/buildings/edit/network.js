import Ember from 'ember';

const {
  computed,
  copy,
  isEmpty
} = Ember;

const IMAGE_PATHS = {
  room: 'assets/room.png',
  pon_port: 'assets/pon_port.png',
  building: 'assets/building.png',
  door: 'assets/door.png',
  fdh: 'assets/fdh.png',
  olt_chassis: 'assets/olt_chassis.png',
  ont_sn: 'assets/ont_sn.png',
  pon_card: 'assets/pon_card.png',
  rdt: 'assets/rdt.png',
  splitter: 'assets/splitter.png',
  wap: 'assets/wap.png',
  ont_ge_1_mac: 'assets/wap.png',
  ont_ge_2_mac: 'assets/wap.png',
  ont_ge_3_mac: 'assets/wap.png',
  ont_ge_4_mac: 'assets/wap.png',
};

export default Ember.Controller.extend({
  runNodes: computed('model.nodes.[]', 'filterIds', function() {
    let nodes = this.get('model.nodes');
    let ids = this.get('filterIds');

    return nodes.filter(node => ids.includes(node.cable_run_id.toString()));
  }),

  filteredGraph: computed('filterIds', 'model.nodes.[]', 'model.edges.[]', function() {
    let { nodes, edges } = this.get('model');
    let ids = this.get('filterIds');
    // must check before creating branch
    if (isEmpty(ids)) return { edges, nodes };

    let branch = copy(this.get('runNodes'), true);
    if (isEmpty(branch)) return { edges, nodes };

    // make a copy so added edges don't persist
    let _edges = edges.slice();
    let shallowestNode = findShallowestNode(branch);
    let ancestors = copy(findAllAncestors(shallowestNode, nodes), true);
    let ponCardNode = ancestors.findBy('node_type', 'pon_card');
    let ponPortNode = ancestors.findBy('node_type', 'pon_port');
    let buildingNode = ancestors.findBy('node_type', 'building');
    if (ponPortNode) {
      ponCardNode.label = `${ponCardNode.label} \n ${ponPortNode.label}`;
      buildingNode.parent_id = ponCardNode.id;
    }

    _edges.push({ id: 'pon-building-edge', from: ponCardNode.id, to: buildingNode.id });
    branch.push(...ancestors);
    let _nodes = this._assignNodeImages(branch)
                     .reject(node => node.node_value === 'N/A')
                     .filter(node => node.node_type !== 'pon_port');

    // we need to move all nodes below pon port up one level after
    // we merge pon port into pon card
    if (ponPortNode) _nodes = this._decreaseNodeLevel(_nodes);

    return { edges: _edges, nodes: _nodes };
  }),


  tableHeaders: computed('model.cableRuns.[]', function() {
    let cableRuns = this.get('model.cableRuns');
    if (!isEmpty(cableRuns)) {
      // let cableRun = cableRuns.get('firstObject');
      // let keys = Object.keys(cableRun.toJSON());
      // let sheetIndex = keys.indexOf('sheet');
      // return keys.slice(0, sheetIndex);
      return ['site', 'building', 'oltRack', 'oltChassis', 'ponCard', 'ponPort', 'vamShelf', 'vamModule', 'vamPort', 'backboneCable', 'backboneShelf', 'backbonePort', 'fdh', 'fdhLocation', 'splitter', 'splitterFiber', 'fdhPort', 'rdt', 'rdtPortCount', 'rdtLocation', 'rdtPort', 'drop', 'room', 'ontModel', 'ontSn', 'ontGe1Device', 'ontGe1Mac', 'ontGe2Device', 'ontGe2Mac', 'ontGe3Device', 'ontGe3Mac', 'ontGe4Device', 'ontGe4Mac', 'notes'];
    }
    return ['No sheets uploaded'];
  }),

  _assignNodeImages(nodes) {
    return nodes.map(node => {
      if (node === undefined) return;

      let _node = node;
      _node.brokenImage = 'assets/building.png';
      _node.shape = 'image';
      _node.image = IMAGE_PATHS[node.node_type];
      if (node.node_type === 'pon_port') {
        _node.size = 16;
      }

      return _node;
    });
  },

  _decreaseNodeLevel(nodes) {
    return nodes.map(node => {
      if (parseInt(node.level, 10) > 3) {
        node.level -= 1;
      }
      return node;
    });
  },

  actions: {
    filterGraph(id) {
      this.set('filterIds', [id]);
    }
  }
});

function findShallowestNode(tree) {
  let sorted = tree.sort((n1, n2) => parseInt(n1.level, 10) - parseInt(n2.level, 10));
  return sorted[0];
}

function findAllAncestors(node, tree) {
  let nodes = [];
  while (node && node.level > 1) {
    let parent = tree.findBy('id', node.parent_id);
    if (parent) {
      nodes.push(parent);
    }
    node = parent;
  }
  return nodes;
}
