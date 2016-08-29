import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';

let company;
let sites;
let currentUser;

moduleForAcceptance('Acceptance | companies network sites', {
  beforeEach() {
    currentUser = server.create('user', { role: 'admin' });
    authenticateSession(this.application, { accountId: currentUser.id });
    company = server.create('company', { name: 'ACME' });
    sites = server.createList('network-site', 3, { companyId: company.id });
    company.networkSites = sites;
  }
});

test('it contains link to add new site', function(assert) {
  visit(`/sites/companies/${company.id}/edit`);

  click('[data-test-selector="new-site-button"]');

  andThen(function() {
    assert.equal(
      currentURL(),
      `/sites/companies/${company.id}/network-sites/new`,
      'new site button redirects to new site page'
    );
  });
});

test('it links sites to their edit page', function(assert) {
  visit(`/sites/companies/${company.id}/edit`);

  click('[data-test-selector="network-site-item"]:first');

  andThen(function() {
    assert.equal(
      currentURL(),
      `/sites/network-sites/${sites[0].id}/edit`,
      'site links to edit page'
    );
  });
});
