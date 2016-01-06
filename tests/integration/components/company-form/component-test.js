import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('company-form', 'Integration | Component | company form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{company-form}}`);

  assert.ok(this.$('form').length);
});

test('it submits on click of `Update` button', function(assert) {
  const companyName = 'ACME';
  this.set('submitAction', (name) => {
    assert.equal(name, companyName);
  });

  this.render(hbs`{{company-form on-submit=(action submitAction)}}`);

  this.$('[data-test-selector="company-name-input"]').val(companyName);
  this.$('[data-test-selector="company-name-input"]').change();

  this.$('[data-test-selector="submit-button"]').click();
});

test('it triggers delete on click of `Delete` button', function(assert) {
  this.set('deleteAction', () => {
    assert.ok(true);
  });

  this.render(hbs`{{company-form on-delete=(action deleteAction)}}`);

  this.$('[data-test-selector="delete-button"]').click();
});

test('it validates name field', function(assert) {
  assert.expect(0);

  this.set('submitAction', () => {
    assert.ok(true);
  });

  this.render(hbs`{{company-form on-submit=(action submitAction)}}`);

  this.$('[data-test-selector="submit-button"]').click();
});

test('it does not show delete button for `new` route', function(assert) {
  this.render(hbs`{{company-form routeName='new'}}`);

  assert.equal(this.$('[data-test-selector="delete-button"]').length, 0);
});
