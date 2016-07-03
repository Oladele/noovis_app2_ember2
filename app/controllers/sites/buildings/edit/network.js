import Ember from 'ember';

const {
  computed,
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
    let nodesWithImages = branch.map(node => {
      if (node === undefined) {
        return;
      }

      let _node = node;
      _node.brokenImage = 'assets/building.png';
      _node.shape = 'image';
      _node.image = IMAGE_PATHS[node.node_type];
      return _node;
    });

    let nodesWithFilteredValues = nodesWithImages.reject(node => node.node_value === 'N/A');

    return { edges, nodes: nodesWithFilteredValues };
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
