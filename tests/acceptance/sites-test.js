import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sites');

test('visiting /sites', function(assert) {
  var company = server.create('company', {name: "ACME"});
  server.create('network-site', {
     name: "ACME Lab",
     company: company.id
  });

  server.createList('network-site', 3, {company: company.id});
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
        find('[data-test-selector="network-site-link"]:first').text(),
        "ACME Lab",
        "Network site links contain the network-site name");
  });
});


test('Sites page company links', function(assert) {
  var company = server.create('company', {name: "ACME"});
  // server.create('network-site', {
  //    name: "ACME Lab",
  //    company: company.id
  // });

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
  let networkSite = server.create('network-site', {
     name,
     company: company.id
  });

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
