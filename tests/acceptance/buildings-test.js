import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

let company;
let site;

moduleForAcceptance('Acceptance | buildings', {
  beforeEach() {
    company = server.create('company', { name: 'ACME' });
    site = server.create('network-site', { company: company.id });
  }
});

test('can add a building to a site', function(assert) {
  visit(`/sites/network-sites/${site.id}/buildings/new`);

  let name = 'foo';
  let description = 'bar';

  fillIn('[data-test-selector=name-input]', name);
  fillIn('[data-test-selector=description-input]', description);
  click('[data-test-selector=submit-button]');


  andThen(() => {
    let building = server.db.buildings[0];
    assert.equal(server.db.buildings.length, 1, 'added a building');
    assert.equal(building.name, name, 'has the correct name');
  });
});
