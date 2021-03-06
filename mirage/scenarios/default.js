import { faker } from 'ember-cli-mirage';

export default function( server ) {

  // Princeton

  var princetonCompany = server.create('company', {name: "Princeton University"});

  princetonCompany.createNetworkSite({
    name: "Princeton Campus",
    address: "Princeton, NJ 08544, United States",
    lat: 40.3467174,
    lng: -74.6568772
  });

  let nodeCounts = [{
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

  // Erickson

  // - Company
  var ericksonCompany = server.create('company', {
    name: "Erickson Living",
    nodeCounts
  });

  let noovis = server.create('company', { name: 'Noovis' });

  // --->Network Site
  var charlestown = ericksonCompany.createNetworkSite({
    name: "Charlestown",
    address: "715 Maiden Choice Lane, Catonsville, MD, United States",
    lat: 39.2690103,
    lng: -76.7014073,
    nodeCounts
  });


  // ------>Building
  let arborside = charlestown.createBuilding({
    name: "Arborside",
    description: "A building description",
    portsActive: 65,
    portsTotal: 126,
    portsActivePercent: 51,
    lat: 39.2660111,
    lng: -76.7034171,
    nodeCounts
  });

  // ------>Building
  charlestown.createBuilding({
    name: "Brookside",
    description: "A building description",
    portsActive: 66,
    portsTotal: 320,
    portsActivePercent: 21,
    lat: 39.2670122,
    lng: -76.7024272
  });

  // ------>Building
  charlestown.createBuilding({
    name: "Chapel Court",
    description: "A building description",
    portsActive: 133,
    portsTotal: 160,
    portsActivePercent: 83,
    lat: 39.2690133,
    lng: -76.7014373
  });

  // ------>Building
  charlestown.createBuilding({
    name: "Caton Ridge",
    description: "A building description",
    portsActive: 89,
    portsTotal: 96,
    portsActivePercent: 93,
    lat: 39.2710144,
    lng: -76.7004474
  });

  ericksonCompany.createNetworkSite({
    name: "Lantern Hill",
    address: "603 Mountain Avenue, New Providence, NJ 07974, United States",
    lat: 40.687177,
    lng: -74.400954
  });

  ericksonCompany.createNetworkSite({
    name: "Ashby Ponds",
    address: "21170 Ashby Ponds Boulevard, Ashburn, VA 20147, United States",
    lat: 39.0294136,
    lng: -77.4549737
  });

  ericksonCompany.createNetworkSite({
    name: "Greenspring Valley",
    address: "7410 Spring Village Drive, Springfield, VA 22150, United States",
    lat: 38.7671371,
    lng: -77.2032638
  });

  let workbook = server.create('workbook', {
    name: 'my workbook'
  });

  let parkTerrace = arborside.createSheet({
    name: 'Park Terrace',
    updatedAt: new Date(),
    workbookId: workbook.id,
    recordCount: 10
  });

  let hamptonPlace = arborside.createSheet({
    name: 'Hampton Place',
    updatedAt: new Date(),
    workbookId: workbook.id,
    recordCount: 5,
    versions: [{
      user: {
        id: '1',
        email: 'wusteven@gmail.com'
      },
      event_type: 'update',
      changes: {
        room: [
          'N/A',
          '456'
        ],
        updated_at: [
          '2016-05-12T22:55:15.895Z',
          '2016-05-14T21:37:22.569Z'
        ],
        notes: [
          '',
          'Follow up in 2 weeks'
        ]
      },
      cable_run: {
        ont_sn: '90EF1'
      }
    }]
  });

  parkTerrace.createCableRun({
    site: parkTerrace.name,
  });

  hamptonPlace.createCableRun({
    id: 18297,
    site: hamptonPlace.name,
  });

  // server.create('cable-run', {
    // id: 18296,
    // sheet: hamptonPlace.id,
    // site: hamptonPlace.name,
  // });

  // server.create('workbook', {
    // name: 'my workbook',
    // sheet: hamptonPlace.id
  // });
  //
  noovis.createUser({
    id: 1,
    email: 'admin',
    role: 'admin',
    last_accessed: faker.date.recent(),
  });

  noovis.createUser({
    id: 2,
    email: 'user',
    role: 'user',
    last_accessed: faker.date.recent(),
  });

  ericksonCompany.createUser({
    id: 3,
    email: 'customer',
    role: 'customer',
    last_accessed: faker.date.recent(),
  });
}
