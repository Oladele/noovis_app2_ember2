import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | sites', {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test('visiting /sites', function(assert) {
  var company = server.create('company', {name: "ACME"});
  company.createNetworkSite({
     name: "ACME Lab"
  });

  server.createList('network-site', 3, { companyId: company.id });
  visit('/sites');

  andThen(function() {
    assert.equal(currentURL(), '/sites');

    assert.equal(
        find('[data-test-selector="company-link"]').length,
        1,
        "All company links are rendered");

    assert.equal(
        find('[data-test-selector="company-link"]').text(),
        "ACME",
        "Company links contain the company name");

    assert.equal(
        find('[data-test-selector="network-site-link"]').length,
        4,
        "All network site links are rendered");

    assert.equal(
        find('[data-test-selector="network-site-link"]:first').text().trim(),
        "ACME Lab (0)",
        "Network site links contain the network-site name");
  });
});


test('Sites page company links', function(assert) {
  var company = server.create('company', {name: "ACME"});

  visit('/sites');
  click('[data-test-selector="company-link"]');

  andThen(function() {
    assert.equal(currentURL(), `/sites/companies/${company.id}/edit`);
    assert.equal(
      find('[data-test-selector="company-title"]:first').text(),
      "ACME",
      "Company title is on show company page");
  });
});

test('Sites page network-site links', function(assert) {
  assert.expect(2);

  let name = 'ACME Lab';
  let company = server.create('company', {name: "ACME"});
  let networkSite = company.createNetworkSite({ name });

  visit('/sites');
  click('[data-test-selector="network-site-link"]');

  andThen(() => {
    assert.equal(currentURL(), `/sites/network-sites/${networkSite.id}/edit`);
    assert.equal(
      find('[data-test-selector="network-site-title"]:first').text(),
      name,
      "Network Site title is on show network-site page");
  });
});

test('Sites page contains `Add Company` button', function(assert) {
  visit('/sites');
  click('[data-test-selector="new-company-button"]');

  andThen(() => assert.equal(currentURL(), '/sites/companies/new'));
});
