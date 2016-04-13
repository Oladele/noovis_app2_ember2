import networkTreeData from './network-tree-data';
import Mirage from 'ember-cli-mirage';
import cableRunData from './cable-run-data';
import networkGraphData from './_latest-network-graph-data';

export default function() {

  this.get('/network-sites', 'network-sites');
  this.get('/network-sites/:id', 'network-site');
  this.del('/network-sites/:id', 'network-site');
  this.post('/network-sites', 'network-site');
  this.patch('/network-sites/:id', 'network-site');

  this.get('/network-sites/:id/stats-columns', () => {
    return ['Bldgs', 'OLTs', 'PON Cards', 'FDHs', 'Splitters', 'RDTs', 'ONTs', 'WAPs', 'Rooms'];
  });

  this.get('/network-sites/:id/stats-content', () => {
    return [
      {
        "Bldgs":18,
        "OLTs":1,
        "PON Cards":5,
        "FDHs":13,
        "Splitters":50,
        "RDTs":390,
        "ONTs":986,
        "WAPs":719,
        "Rooms":1505,
        "Active Channels":986,
        "Standby Channels":614,
        "Active PON Ports":50,
        "Spare Feeder Fibers":106,
        "Active Distribution Ports":986,
        "Spare Distribution Ports":1006,
        "Actual RDT Count":null
      }
    ];
  });

  this.get('/companies', 'companies');
  this.get('/companies/:id', 'company');
  this.post('/companies', 'company');
  this.patch('/companies/:id', 'company');
  this.del('/companies/:id', 'company');

  this.get('/buildings', 'buildings');
  this.get('/buildings/:id', 'building');
  this.post('/buildings', 'building');
  // this.patch('/buildings/:id', 'building');
  this.patch('/buildings/:id', ({ building }, request) => {
    let id = request.params.id;
    let { attributes } = JSON.parse(request.requestBody).data;
    return building.find(id).update(attributes);
  });
  this.del('/buildings/:id', 'building');

  this.get('/buildings/:id/latest_network_graph', (schema, request) => {
    return networkGraphData;
  });

  this.get('/buildings/:id/show_network_graph', function() {
    return networkTreeData;
  });

  this.post('/import_cable_run', function(db, request) {
    let data = request.requestBody;
    let fileType = data.get('file').type;

    if (!fileType) {
      return new Mirage.Response(400, null, { message: 'File type must be .xls' });
    }

    if (Object.prototype.toString.call(data) === "[object File]") {
      return {
        message: 'Successfully created cable runs'
      };
    }
  });


  this.get('/sheets', 'sheets');
  this.get('/sheets/:id', 'sheet');

  this.get('/sheets/:id/cable_runs', function() {
    return cableRunData;
  });

  this.get('/cable-runs', 'cable-runs');
  this.get('/cable-runs/:id', 'cable-run');

  this.get('/workbooks/:id', 'workbook');

  this.post('/login', (schema, request) => {
    return new Mirage.Response(
      200,
      { myHeader: 'header' },
      {
        access_token: 'secret-token',
        account_id: 1
      }
    );
  });

  this.post('/api/token-auth', (schema, request) => {
    return new Mirage.Response(
      201,
      { 'Content-Type': 'application/json' },
      {
        access_token: 'secret-token',
        account_id: 1
      }
    );
  });

  this.get('/global_node_counts', (schema, request) => {
    return [{
      node_type: "olt_chassis",
      count: 0,
      node_type_pretty: "Olt chasses"
    },
    {
      node_type: "pon_card",
      count: 2,
      node_type_pretty: "Pon cards"
    },
    {
      node_type: "fdh",
      count: 3,
      node_type_pretty: "Fdhs"
    },
    {
      node_type: "splitter",
      count: 3,
      node_type_pretty: "Splitters"
    },
    {
      node_type: "rdt",
      count: 26,
      node_type_pretty: "Rdts"
    },
    {
      node_type: "ont_sn",
      count: 26,
      node_type_pretty: "Ont sns"
    },
    {
      node_type: "room",
      count: 26,
      node_type_pretty: "Rooms"
    }];
  });

  this.get('/users', 'users');
  this.post('/users', 'user');
}
