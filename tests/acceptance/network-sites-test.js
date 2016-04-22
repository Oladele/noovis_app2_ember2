/* global notifyGMapAutocomplete */
/* global stubGMapAutocomplete */
import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';

class SitePageObject {
  constructor(env) {
    this.env = env;
  }

  fillName(name) {
    fillIn('[data-test-selector=site-name-input]', name);
    return this;
  }

  fillLocation(location) {
    notifyGMapAutocomplete(this.env, 'basic-autocomplete', location);
    return this;
  }

  clickDelete() {
    click('[data-test-selector=delete-button]');
    return this;
  }

  clickDeleteBuilding() {
    click('[data-test-selector=delete-building-button]');
    return this;
  }

  clickBuildingLink() {
    click('[data-test-selector=building-edit-link]');
    return this;
  }

  submit() {
    click('[data-test-selector=submit-button]');
  }
}

let company;
let currentUser;

moduleForAcceptance('Acceptance | network sites', {
  beforeEach() {
    currentUser = server.create('user', { role: 'admin' });
    authenticateSession(this.application, { accountId: currentUser.id });
    company = server.create('company', { name: 'ACME' });
 }
});

test('map is shown on `new` page', function(assert) {
  visit(`/sites/companies/${company.id}/network-sites/new`);

  andThen(() => {
    assert.ok(find('.ember-cli-g-map').length, 'found map');
  });
});

test('can create new network site', function(assert) {
  assert.expect(3);

  stubGMapAutocomplete(this);
  visit(`/sites/companies/${company.id}/network-sites/new`);

  let name = 'The Coffee Shop';
  let address = '100 Main St, Vancouver, BC, Canada';
  let lat = '49.123';
  let lng = '123.456';
  let place = {
    geometry: {
      location: {
        lat() {
          return lat;
        },
        lng() {
          return lng;
        }
      }
    },
    formatted_address: address
  };

  new SitePageObject(this)
    .fillName(name)
    .fillLocation(place)
    .submit();

  andThen(() => {
    let site = server.db.networkSites[0];
    assert.equal(site.name, name, 'has correct name');
    assert.equal(site.lat, lat, 'has correct latitude');
    assert.equal(site.address, address, 'has correct address');
  });
});

test('map is shown on `edit` page', function(assert) {
  assert.expect(1);

  const site = company.createNetworkSite();
  visit(`/sites/network-sites/${site.id}/edit`);

  andThen(() => {
    assert.ok(find('.ember-cli-g-map').length, 'found map');
  });
});

test('can update network site', function(assert) {
  assert.expect(2);

  stubGMapAutocomplete(this);
  let site = company.createNetworkSite({
    name: 'Site 1',
    address: '123 Main St, Vancouver, BC, Canada'
  });

  visit(`/sites/network-sites/${site.id}/edit`);

  let address = '100 Main St, Vancouver, BC, Canada';
  let name = 'Site 2';
  let place = {
    geometry: {
      location: {
        lat() {
          return '49.123';
        },
        lng() {
          return '123.456';
        }
      }
    },
    formatted_address: address
  };

  new SitePageObject(this)
    .fillName(name)
    .fillLocation(place)
    .submit();

  visit(`/sites/network-sites/${site.id}/edit`);

  andThen(() => {
    let site = server.db.networkSites[0];
    assert.equal(site.name, name, 'name was updated');
    assert.equal(site.address, address, 'has correct address');
  });
});

test('can delete network site', function(assert) {
  assert.expect(1);

  const company = server.create('company', { name: 'ACME' });
  const site = company.createNetworkSite({ name: 'Site 1' });

  visit(`/sites/network-sites/${site.id}/edit`);

  new SitePageObject()
    .clickDelete();

  andThen(() => {
    assert.equal(server.db.networkSites.length, 0, 'no sites were found');
  });
});

test('can go to new buildings page', function(assert) {
  assert.expect(1);

  let site = company.createNetworkSite();

  visit(`/sites/network-sites/${site.id}/edit`);
  click('[data-test-selector=add-building-button]');

  andThen(() => {
    assert.equal(currentURL(), `/sites/network-sites/${site.id}/buildings/new`);
  });
});

test('shows buildings list', function(assert) {
  assert.expect(1);

  let site = company.createNetworkSite();

  site.createBuilding({ name: 'foo' });

  visit(`/sites/network-sites/${site.id}/edit`);

  andThen(() => {
    assert.equal(find('[data-test-selector=building-item]').text().trim(), 'foo', 'found building');
  });
});

test('can delete buildings in list', function(assert) {
  assert.expect(1);

  let site = company.createNetworkSite();
  site.createBuilding();

  visit(`/sites/network-sites/${site.id}/edit`);

  new SitePageObject()
    .clickDeleteBuilding();

  andThen(() => {
    assert.equal(server.db.buildings.length, 0, 'no buildings were found');
  });
});

test('should navigate to building.edit', function(assert) {
  let site = company.createNetworkSite();
  site.createBuilding();

  visit(`/sites/network-sites/${site.id}/edit`);

  new SitePageObject()
    .clickBuildingLink();

  andThen(() => {
    assert.equal(find('[data-test-selector=g-maps-container]').length, 1, 'rendered map container');
  });
});
