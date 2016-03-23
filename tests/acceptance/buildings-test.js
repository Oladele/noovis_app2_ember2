import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

class BuildingFormPageObject {
  fillName(name) {
    fillIn('[data-test-selector=name-input]', name);
    return this;
  }

  clickMap(lat, lng) {
    setControllerProperty('sites/network-sites/network-site/buildings/new', 'bLat', lat);
    setControllerProperty('sites/network-sites/network-site/buildings/new', 'bLng', lng);
    return this;
  }

  clickEditMap(lat, lng) {
    setControllerProperty('sites/buildings/edit/map', 'bLat', lat);
    setControllerProperty('sites/buildings/edit/map', 'bLng', lng);
    return this;
  }

  clickDeleteBuilding() {
    click('[data-test-selector=delete-building-button]');
  }

  fillDescription(description) {
    fillIn('[data-test-selector=description-input]', description);
    return this;
  }

  submit() {
    click('[data-test-selector=submit-button]');
  }
}

let company;
let site;

moduleForAcceptance('Acceptance | buildings', {
  beforeEach() {
    company = server.create('company', { name: 'ACME' });
    site = company.createNetworkSite({ name: 'Herbert' });
  }
});

test('can add a building to a site', function(assert) {
  assert.expect(5);

  visit(`/sites/network-sites/${site.id}/buildings/new`);

  let name = 'foo';
  let description = 'bar';
  let lat = 49.123;
  let lng = -123.456;

  new BuildingFormPageObject()
    .clickMap(lat, lng)
    .fillName(name)
    .fillDescription(description)
    .submit();

  andThen(() => {
    let building = server.db.buildings[0];
    assert.equal(server.db.buildings.length, 1, 'added a building');
    assert.equal(building.name, name, 'has the correct name');
    assert.equal(building.lat, lat, 'has the correct latitude');
    assert.equal(building.lng, lng, 'has the correct longitude');
    assert.equal(
      find('[data-test-selector=network-site-link]').text().trim(),
      `${site.name} (1)`,
      'left bar shows correct building count'
    );
  });
});

test('can update building info', function(assert) {
  assert.expect(4);

  let building = site.createBuilding({
    name: 'foo',
    description: 'bar',
    lat: -49.876,
    lng: 123.312
  });
  let lat = 49.876;
  let lng = -123.321;

  visit(`/sites/buildings/${building.id}`);

  new BuildingFormPageObject()
    .clickEditMap(lat, lng)
    .fillName('baz')
    .fillDescription('qux')
    .submit();

  andThen(() => {
    let building = server.db.buildings[0];
    assert.equal(building.name, 'baz', 'name was updated');
    assert.equal(building.description, 'qux', 'description was updated');
    assert.equal(building.lat, lat, 'latitude was updated');
    assert.equal(building.lng, lng, 'longitude was updated');
  });
});

test('can delete a building', function(assert) {
  assert.expect(1);

  let building = site.createBuilding();

  visit(`/sites/buildings/${building.id}`);

  new BuildingFormPageObject()
    .clickDeleteBuilding();

  andThen(() => {
    assert.equal(server.db.buildings.length, 0, 'no buildings were found');
  });
});
