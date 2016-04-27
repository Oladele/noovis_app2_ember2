import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import testSelector from 'noovis-app2-ember2/tests/helpers/ember-test-selectors';
import { authenticateSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';

let admin;
let user;
let customer;
let company;
let customerId = 3;
let networkSite;

moduleForAcceptance('Acceptance | roles', {
  beforeEach() {
    company = server.create('company', { name: 'Harvard' });
    admin = server.create('user', { email: 'admin@noovis.com', role: 'admin' });
    user = server.create('user', { email: 'user@noovis.com', role: 'user' });
    customer = server.create('user', { id: customerId, email: 'user@harvard.edu', role: 'customer', companyId: company.id  });
    networkSite = server.create('networkSite', { companyId: company.id });
  }
});

test('admin flows', function(assert) {
  authenticateSession(this.application, { accountId: admin.id });
  visit('/sites');
  click(testSelector('selector', 'new-company-button'));

  andThen(() => {
    assert.equal(currentURL(), '/sites/companies/new', 'directed to new company page');
  });

  click(testSelector('selector', 'manage-users-link'));

  andThen(() => {
    assert.equal(currentURL(), '/admin/users', 'can visit manage users page');
  });

  click(testSelector('selector', 'add-user-link'));

  andThen(() => {
    assert.equal(currentURL(), '/admin/users/new', 'can visit new users page');
  });

  visit('/admin/users');
  click('[data-test-selector=edit-user-link]:contains("user@harvard.edu")');

  andThen(() => {
    assert.equal(currentURL(), `/admin/users/${customerId}`, 'can visit edit user page');
  });
});

test('user flows', function(assert) {
  authenticateSession(this.application, { accountId: user.id });
  visit('/sites');

  andThen(() => {
    assert.equal(find(testSelector('selector', 'new-company-button')).length,
        0,
        'new company button is hidden');
  });

  visit('/sites/companies/new');

  andThen(() => {
    assert.equal(currentURL(), '/sites', 'cannot enter add company path');
  });

  visit(`/admin/users/${customerId}`);

  andThen(() => {
    assert.equal(currentURL(), '/admin/users', 'cannot enter edit user path');
  });

  visit('/admin/users/new');

  andThen(() => {
    assert.equal(currentURL(), '/admin/users', 'cannot enter new user path');
  });

  visit(`/sites/companies/${company.id}/edit`);

  andThen(() => {
    assert.equal(find('[data-test-selector=submit-button]').length, 0, 'cannot submit form updates');
  });

  visit(`/sites/companies/${company.id}/network-sites/new`);

  andThen(() => {
    assert.equal(currentURL(), `/sites/companies/${company.id}/edit`, 'cannot access new network site path');
  });

  visit(`/sites/network-sites/${networkSite.id}/edit`);

  andThen(() => {
    assert.equal(find('[data-test-selector=submit-button]').length, 0, 'cannot submit network site form update');
    assert.equal(find('[data-test-selector=delete-button]').length, 0, 'cannot delete network site');
  });

  visit(`/sites/network-sites/${networkSite.id}/buildings/new`);

  andThen(() => {
    assert.equal(currentURL(), `/sites/network-sites/${networkSite.id}/edit`);
  });
});

test('customers cannot add new company', function(assert) {
  authenticateSession(this.application, { accountId: customer.id });
  visit('/sites');

  andThen(() => {
    assert.equal(
      find(testSelector('selector', 'new-company-button')).length,
      0,
      'new company button is hidden'
    );
  });

  visit('/sites/companies/new');

  andThen(() => {
    assert.equal(currentURL(), '/sites', 'cannot enter path directly');
  });
});

test('customers cannot view cable runs', function(assert) {
  authenticateSession(this.application, { accountId: customer.id });
  let building = server.create('building', { companyId: company.id });

  visit(`/sites/buildings/${building.id}`);

  andThen(() => {
    assert.equal(find('a:contains("CRL Uploads")').length, 0, 'does not see cable runs tab');
  });

  visit(`/sites/buildings/${building.id}/crl-uploads`);

  andThen(() => {
    assert.equal(currentURL(), `/sites/buildings/${building.id}/map`, 'cannot access cable runs path');
  });
});

test('customer flows', function(assert) {
  authenticateSession(this.application, { accountId: customer.id });
  visit('/sites');

  andThen(() => {
    assert.equal(find(testSelector('selector', 'new-company-button')).length,
        0,
        'new company button is hidden');
  });

  visit('/sites/companies/new');

  andThen(() => {
    assert.equal(currentURL(), '/sites', 'cannot enter add company path');
  });

  visit(`/admin/users/`);

  andThen(() => {
    assert.equal(currentURL(), '/sites', 'cannot enter admin path');
  });

  visit(`/sites/companies/${company.id}/edit`);

  andThen(() => {
    assert.equal(find('[data-test-selector=submit-button]').length, 0, 'cannot submit form updates');
  });

  visit(`/sites/companies/${company.id}/network-sites/new`);

  andThen(() => {
    assert.equal(currentURL(), `/sites/companies/${company.id}/edit`, 'cannot access new network site path');
  });

  visit(`/sites/network-sites/${networkSite.id}/edit`);

  andThen(() => {
    assert.equal(find('[data-test-selector=submit-button]').length, 0, 'cannot submit network site form update');
    assert.equal(find('[data-test-selector=delete-button]').length, 0, 'cannot delete network site');
  });

  visit(`/sites/network-sites/${networkSite.id}/buildings/new`);

  andThen(() => {
    assert.equal(currentURL(), `/sites/network-sites/${networkSite.id}/edit`);
  });
});

// sites/companies/new
// sites/companies/company/edit
// sites/companies/company/network-sites/new
// sites/network-sites/edit
// sites/network-sites/network-site/buildings/new
// admin/users/new
// admin/users/edit
