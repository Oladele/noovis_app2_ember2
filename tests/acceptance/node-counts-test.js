import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';

let company;
let site;

const siteNodeCounts = [{
  node_type: 'olt_chassis',
  node_type_pretty: 'Olt chasses',
  count: 2
}];

const buildingNodeCounts = [{
  node_type: 'pon_card',
  node_type_pretty: 'Pon cards',
  count: 3
}];

moduleForAcceptance('Acceptance | node counts', {
  beforeEach() {
    authenticateSession(this.application);
    company = server.create('company', { name: 'ACME' });
    site = company.createNetworkSite({
      nodeCounts: siteNodeCounts
    });
  }
});

test('should show network stats', function(assert) {
  visit(`/sites/network-sites/${site.id}/edit`);

  andThen(() => {
    assert.equal(
      find('th').text(), 
      siteNodeCounts[0].node_type_pretty, 
      'shows correct node type'
    );
    assert.equal(
      find('td').text(),
      siteNodeCounts[0].count,
      'shows correct node count'
    );
  });
});

test('should show building stats', function(assert) {
  let building = site.createBuilding({
    nodeCounts: buildingNodeCounts
  });

  visit(`/sites/buildings/${building.id}`);

  andThen(() => {
    assert.equal(
      find('th').text(),
      buildingNodeCounts[0].node_type_pretty,
      'shows correct node type'
    );
    assert.equal(
      find('td').text(),
      buildingNodeCounts[0].count,
      'shows correct node count'
    );
  });
});
