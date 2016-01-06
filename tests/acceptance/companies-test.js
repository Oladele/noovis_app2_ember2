import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | companies');

test('can create new company', function(assert) {
  visit('/sites/companies/new');

  fillIn('[data-test-selector="company-name-input"]', 'ACME');
  click('[data-test-selector="submit-button"]');

  andThen(() => {
    assert.ok(find('[data-test-selector="company-link"]:contains("ACME")').length);
  });
});

test('can update company', function(assert) {
  const company = server.create('company', {name: 'ACME'});

  visit(`/sites/companies/${company.id}/edit`);

  fillIn('[data-test-selector="company-name-input"]', 'ACME2');
  click('[data-test-selector="submit-button"]');

  andThen(() => {
    assert.ok(find('[data-test-selector="company-link"]:contains("ACME2")').length);
  });
});

test('can delete company', function(assert) {
  const company = server.create('company', {name: 'ACME'});

  visit(`/sites/companies/${company.id}/edit`);

  click('[data-test-selector="delete-button"]');

  andThen(() => {
    assert.equal(server.db.companies.length, 0);
  });
});
