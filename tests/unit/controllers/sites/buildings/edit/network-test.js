import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:sites/buildings/edit/network', 'Unit | Controller | sites/buildings/edit/network', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

const NODES = [
{
  id: 31,
  network_graph_id: 3,
  node_value: "F40F1B72D5C0",
  node_level: 9,
  created_at: "2016-03-18T13:32:31.715Z",
  updated_at: "2016-03-18T13:32:31.715Z",
  parent_id: 27,
  cable_run_id: 18291,
  node_type: "ont_ge_4_mac",
  label: " ONT_GE_4_MAC: F40F1B72D5C0",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/ont_ge_4_mac.png",
  level: "9"
},
{
  id: 27,
  network_graph_id: 3,
  node_value: "90EF1",
  node_level: 8,
  created_at: "2016-03-18T13:32:31.551Z",
  updated_at: "2016-03-18T13:32:31.551Z",
  parent_id: 26,
  cable_run_id: 18291,
  node_type: "ont_sn",
  label: " ONT_SN: 90EF1",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/ont_sn.png",
  level: "8"
},
{
  id: 26,
  network_graph_id: 3,
  node_value: "103.0",
  node_level: 7,
  created_at: "2016-03-18T13:32:31.475Z",
  updated_at: "2016-03-18T13:32:31.475Z",
  parent_id: 19,
  cable_run_id: 18291,
  node_type: "room",
  label: " ROOM: 103.0",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/room.png",
  level: "7"
},
{
  id: 25,
  network_graph_id: 3,
  node_value: "F40F1B72D488",
  node_level: 9,
  created_at: "2016-03-18T13:32:31.447Z",
  updated_at: "2016-03-18T13:32:31.447Z",
  parent_id: 21,
  cable_run_id: 18290,
  node_type: "ont_ge_4_mac",
  label: " ONT_GE_4_MAC: F40F1B72D488",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/ont_ge_4_mac.png",
  level: "9"
},
{
  id: 21,
  network_graph_id: 3,
  node_value: "90DE2",
  node_level: 8,
  created_at: "2016-03-18T13:32:31.313Z",
  updated_at: "2016-03-18T13:32:31.313Z",
  parent_id: 20,
  cable_run_id: 18290,
  node_type: "ont_sn",
  label: " ONT_SN: 90DE2",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/ont_sn.png",
  level: "8"
},
{
  id: 20,
  network_graph_id: 3,
  node_value: "101.0",
  node_level: 7,
  created_at: "2016-03-18T13:32:31.264Z",
  updated_at: "2016-03-18T13:32:31.264Z",
  parent_id: 19,
  cable_run_id: 18290,
  node_type: "room",
  label: " ROOM: 101.0",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/room.png",
  level: "7"
},
{
  id: 19,
  network_graph_id: 3,
  node_value: "1.0",
  node_level: 6,
  created_at: "2016-03-18T13:32:31.216Z",
  updated_at: "2016-03-18T13:32:31.216Z",
  parent_id: 18,
  cable_run_id: 18290,
  node_type: "rdt",
  label: " RDT: 1.0",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/rdt.png",
  level: "6"
},
{
  id: 18,
  network_graph_id: 3,
  node_value: "1.0",
  node_level: 5,
  created_at: "2016-03-18T13:32:31.180Z",
  updated_at: "2016-03-18T13:32:31.180Z",
  parent_id: 17,
  cable_run_id: 18290,
  node_type: "splitter",
  label: " SPLITTER: 1.0",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/splitter.png",
  level: "5"
},
{
  id: 17,
  network_graph_id: 3,
  node_value: "HV1",
  node_level: 4,
  created_at: "2016-03-18T13:32:31.145Z",
  updated_at: "2016-03-18T13:32:31.145Z",
  parent_id: 16,
  cable_run_id: 18290,
  node_type: "fdh",
  label: " FDH: HV1",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/fdh.png",
  level: "4"
},
{
  id: 16,
  network_graph_id: 3,
  node_value: "Harborview",
  node_level: 3,
  created_at: "2016-03-18T13:32:31.100Z",
  updated_at: "2016-03-18T13:32:31.100Z",
  parent_id: 15,
  cable_run_id: 18290,
  node_type: "building",
  label: " BUILDING: Harborview",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/building.png",
  level: "3"
},
{
  id: 15,
  network_graph_id: 3,
  node_value: "14",
  node_level: 2,
  created_at: "2016-03-18T13:32:31.067Z",
  updated_at: "2016-03-18T13:32:31.067Z",
  parent_id: 14,
  cable_run_id: 18290,
  node_type: "pon_port",
  label: " PON_PORT: 14",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/pon_port.png",
  level: "2"
},
{
  id: 14,
  network_graph_id: 3,
  node_value: "5",
  node_level: 1,
  created_at: "2016-03-18T13:32:31.027Z",
  updated_at: "2016-03-18T13:32:31.027Z",
  parent_id: 1,
  cable_run_id: 18290,
  node_type: "pon_card",
  label: " PON_CARD: 5",
  shape: "image",
  brokenImage: "assets/building.png",
  image: "assets/pon_card.png",
  level: "1"
}
];


const EDGES = [
{
  id: 21,
  network_graph_id: 3,
  to_node_id: 27,
  from_node_id: 31,
  edge_level: 9,
  created_at: "2016-03-18T13:32:31.743Z",
  updated_at: "2016-03-18T13:32:31.743Z",
  level: 9,
  to: 27,
  from: 31
},
{
  id: 20,
  network_graph_id: 3,
  to_node_id: 26,
  from_node_id: 27,
  edge_level: 8,
  created_at: "2016-03-18T13:32:31.583Z",
  updated_at: "2016-03-18T13:32:31.583Z",
  level: 8,
  to: 26,
  from: 27
},
{
  id: 19,
  network_graph_id: 3,
  to_node_id: 19,
  from_node_id: 26,
  edge_level: 7,
  created_at: "2016-03-18T13:32:31.521Z",
  updated_at: "2016-03-18T13:32:31.521Z",
  level: 7,
  to: 19,
  from: 26
},
{
  id: 18,
  network_graph_id: 3,
  to_node_id: 21,
  from_node_id: 25,
  edge_level: 9,
  created_at: "2016-03-18T13:32:31.459Z",
  updated_at: "2016-03-18T13:32:31.459Z",
  level: 9,
  to: 21,
  from: 25
},
{
  id: 17,
  network_graph_id: 3,
  to_node_id: 20,
  from_node_id: 21,
  edge_level: 8,
  created_at: "2016-03-18T13:32:31.341Z",
  updated_at: "2016-03-18T13:32:31.341Z",
  level: 8,
  to: 20,
  from: 21
},
{
  id: 16,
  network_graph_id: 3,
  to_node_id: 19,
  from_node_id: 20,
  edge_level: 7,
  created_at: "2016-03-18T13:32:31.287Z",
  updated_at: "2016-03-18T13:32:31.287Z",
  level: 7,
  to: 19,
  from: 20
},
{
  id: 15,
  network_graph_id: 3,
  to_node_id: 18,
  from_node_id: 19,
  edge_level: 6,
  created_at: "2016-03-18T13:32:31.248Z",
  updated_at: "2016-03-18T13:32:31.248Z",
  level: 6,
  to: 18,
  from: 19
},
{
  id: 14,
  network_graph_id: 3,
  to_node_id: 17,
  from_node_id: 18,
  edge_level: 5,
  created_at: "2016-03-18T13:32:31.203Z",
  updated_at: "2016-03-18T13:32:31.203Z",
  level: 5,
  to: 17,
  from: 18
},
{
  id: 13,
  network_graph_id: 3,
  to_node_id: 16,
  from_node_id: 17,
  edge_level: 4,
  created_at: "2016-03-18T13:32:31.165Z",
  updated_at: "2016-03-18T13:32:31.165Z",
  level: 4,
  to: 16,
  from: 17
},
{
  id: 12,
  network_graph_id: 3,
  to_node_id: 15,
  from_node_id: 16,
  edge_level: 3,
  created_at: "2016-03-18T13:32:31.113Z",
  updated_at: "2016-03-18T13:32:31.113Z",
  level: 3,
  to: 15,
  from: 16
},
{
  id: 11,
  network_graph_id: 3,
  to_node_id: 14,
  from_node_id: 15,
  edge_level: 2,
  created_at: "2016-03-18T13:32:31.088Z",
  updated_at: "2016-03-18T13:32:31.088Z",
  level: 2,
  to: 14,
  from: 15
},
{
  id: 10,
  network_graph_id: 3,
  to_node_id: 1,
  from_node_id: 14,
  edge_level: 1,
  created_at: "2016-03-18T13:32:31.043Z",
  updated_at: "2016-03-18T13:32:31.043Z",
  level: 1,
  to: 1,
  from: 14
}
];

// Replace this with your real tests.
test('should filter nodes with filter ids', function(assert) {
  let controller = this.subject();

  let model = { nodes: NODES, edges: EDGES };
  controller.set('model', model);
  controller.set('filterIds', ["18291"]);

  let filteredGraph = controller.get('filteredGraph');

  let expectedNodes = [
  {
    id: 31,
    network_graph_id: 3,
    node_value: "F40F1B72D5C0",
    node_level: 9,
    created_at: "2016-03-18T13:32:31.715Z",
    updated_at: "2016-03-18T13:32:31.715Z",
    parent_id: 27,
    cable_run_id: 18291,
    node_type: "ont_ge_4_mac",
    label: " ONT_GE_4_MAC: F40F1B72D5C0",
    shape: "image",
    brokenImage: "assets/building.png",
    image: "assets/ont_ge_4_mac.png",
    level: "9"
  },
  {
    id: 27,
    network_graph_id: 3,
    node_value: "90EF1",
    node_level: 8,
    created_at: "2016-03-18T13:32:31.551Z",
    updated_at: "2016-03-18T13:32:31.551Z",
    parent_id: 26,
    cable_run_id: 18291,
    node_type: "ont_sn",
    label: " ONT_SN: 90EF1",
    shape: "image",
    brokenImage: "assets/building.png",
    image: "assets/ont_sn.png",
    level: "8"
  },
  {
    id: 26,
    network_graph_id: 3,
    node_value: "103.0",
    node_level: 7,
    created_at: "2016-03-18T13:32:31.475Z",
    updated_at: "2016-03-18T13:32:31.475Z",
    parent_id: 19,
    cable_run_id: 18291,
    node_type: "room",
    label: " ROOM: 103.0",
    shape: "image",
    brokenImage: "assets/building.png",
    image: "assets/room.png",
    level: "7"
  },
  {
    id: 19,
    network_graph_id: 3,
    node_value: "1.0",
    node_level: 6,
    created_at: "2016-03-18T13:32:31.216Z",
    updated_at: "2016-03-18T13:32:31.216Z",
    parent_id: 18,
    cable_run_id: 18290,
    node_type: "rdt",
    label: " RDT: 1.0",
    shape: "image",
    brokenImage: "assets/building.png",
    image: "assets/rdt.png",
    level: "6"
  },
  {
    id: 18,
    network_graph_id: 3,
    node_value: "1.0",
    node_level: 5,
    created_at: "2016-03-18T13:32:31.180Z",
    updated_at: "2016-03-18T13:32:31.180Z",
    parent_id: 17,
    cable_run_id: 18290,
    node_type: "splitter",
    label: " SPLITTER: 1.0",
    shape: "image",
    brokenImage: "assets/building.png",
    image: "assets/splitter.png",
    level: "5"
  },
  {
    id: 17,
    network_graph_id: 3,
    node_value: "HV1",
    node_level: 4,
    created_at: "2016-03-18T13:32:31.145Z",
    updated_at: "2016-03-18T13:32:31.145Z",
    parent_id: 16,
    cable_run_id: 18290,
    node_type: "fdh",
    label: " FDH: HV1",
    shape: "image",
    brokenImage: "assets/building.png",
    image: "assets/fdh.png",
    level: "4"
  },
  {
    id: 16,
    network_graph_id: 3,
    node_value: "Harborview",
    node_level: 3,
    created_at: "2016-03-18T13:32:31.100Z",
    updated_at: "2016-03-18T13:32:31.100Z",
    parent_id: 15,
    cable_run_id: 18290,
    node_type: "building",
    label: " BUILDING: Harborview",
    shape: "image",
    brokenImage: "assets/building.png",
    image: "assets/building.png",
    level: "3"
  },
  {
    id: 15,
    network_graph_id: 3,
    node_value: "14",
    node_level: 2,
    created_at: "2016-03-18T13:32:31.067Z",
    updated_at: "2016-03-18T13:32:31.067Z",
    parent_id: 14,
    cable_run_id: 18290,
    node_type: "pon_port",
    label: " PON_PORT: 14",
    shape: "image",
    brokenImage: "assets/building.png",
    image: "assets/pon_port.png",
    level: "2"
  },
  {
    id: 14,
    network_graph_id: 3,
    node_value: "5",
    node_level: 1,
    created_at: "2016-03-18T13:32:31.027Z",
    updated_at: "2016-03-18T13:32:31.027Z",
    parent_id: 1,
    cable_run_id: 18290,
    node_type: "pon_card",
    label: " PON_CARD: 5",
    shape: "image",
    brokenImage: "assets/building.png",
    image: "assets/pon_card.png",
    level: "1"
  }];

  assert.deepEqual(filteredGraph.nodes, expectedNodes, 'filter returns correct nodes');
});

test('should return graph if no runs selected', function(assert) {
  let controller = this.subject();
  let model = { nodes: NODES, edges: EDGES };
  controller.set('model', model);
  controller.set('filterIds', []);
  let filteredGraph = controller.get('filteredGraph');

  assert.deepEqual(filteredGraph.nodes, NODES, 'return id graph');
});
