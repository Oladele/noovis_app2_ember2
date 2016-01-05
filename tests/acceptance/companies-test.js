import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | companies');

test('can create new company', function(assert) {
  visit('/sites/companies/new');

  fillIn('#company-name', 'ACME');
  click('[data-role="submit"]');

  andThen(() => {
    assert.ok(find('[data-test-selector="company-link"]:contains("ACME")').length);
  });
});

test('can update company', function(assert) {
  const company = server.create('company', {name: 'ACME'});

  visit(`/sites/companies/${company.id}/edit`);

  fillIn('#company-name', 'ACME2');
  click('[data-role="submit"]');

  andThen(() => {
    assert.ok(find('[data-test-selector="company-link"]:contains("ACME2")').length);
  });
});

test('can delete company', function(assert) {
  const company = server.create('company', {name: 'ACME'});

  visit(`/sites/companies/${company.id}/edit`);

  click('[data-role="company-delete"]');

  andThen(() => {
    assert.equal(server.db.companies.length, 0);
  });
});
