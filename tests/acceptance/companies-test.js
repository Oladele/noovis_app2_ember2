import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

class CompanyFormPageObject {
  fillName(name) {
    fillIn('[data-test-selector="company-name-input"]', name);
    return this;
  }

  submit() {
    click('[data-test-selector="submit-button"]');
    return this;
  }
}

moduleForAcceptance('Acceptance | companies');

test('can create new company', function(assert) {
  visit('/sites/companies/new');

  new CompanyFormPageObject()
    .fillName('ACME')
    .submit();

  andThen(() => {
    assert.equal(find('[data-test-selector="company-link"]:contains("ACME")').length, 1, "new company is created with correct name");
  });
});

test('can update company', function(assert) {
  const company = server.create('company', {name: 'ACME'});

  visit(`/sites/companies/${company.id}/edit`);

  new CompanyFormPageObject()
    .fillName('ACME2')
    .submit();

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

test('show map on company edit page', function(assert) {
  let company = server.create('company', { name: 'ACME' });
  visit(`/sites/companies/${company.id}/edit`);

  andThen(() => {
    assert.equal(find('.testSelector-company-map').length, 1, 'found map');
  });
});
