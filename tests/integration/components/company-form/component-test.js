import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

class CompanyFormPageObject {
  constructor(env) {
    this.env = env;
  }

  fillName(name) {
    const selector = '[data-test-selector="company-name-input"]';
    this.env.$(selector).val(name);
    this.env.$(selector).change();
    return this;
  }

  clickDelete() {
    this.env.$('[data-test-selector="delete-button"]').click();
    return this;
  }

  submit() {
    this.env.$('[data-test-selector="submit-button"]').click();
    return this;
  }
}

moduleForComponent('company-form', 'Integration | Component | company form', {
  integration: true,
  beforeEach(){
    this.form = new CompanyFormPageObject(this);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{company-form}}`);

  assert.ok(this.$('form').length);
});

test('it submits on click of `Update` button', function(assert) {
  const companyName = 'ACME';
  const { resolve } = Ember.RSVP;

  this.set('submitAction', (name) => {
    assert.equal(name, companyName, 'triggered command with correct arguments');
    return resolve();
  });

  this.render(hbs`{{company-form on-submit=(action submitAction)}}`);

  this.form
    .fillName('ACME')
    .submit();
});

test('it triggers delete on click of `Delete` button', function(assert) {
  const { resolve } = Ember.RSVP;
  this.set('deleteAction', () => {
    assert.ok(true);
    return resolve();
  });

  this.render(hbs`{{company-form on-delete=(action deleteAction) isEditing=true}}`);

  this.form.clickDelete();
});

test('it validates name field', function(assert) {
  assert.expect(0);

  this.set('submitAction', () => {
    assert.ok(true);
  });

  this.render(hbs`{{company-form on-submit=(action submitAction)}}`);

  this.form.submit();
});

test('it does not show delete button for `new` route', function(assert) {
  this.render(hbs`{{company-form}}`);

  assert.equal(this.$('[data-test-selector="delete-button"]').length, 0);
});

test('it shows company name if one exists', function(assert) {
  this.render(hbs`{{company-form name=name}}`);

  this.set('name', undefined);
  assert.equal(
    this.$('[data-test-selector="company-name-input"]').val(),
    '',
    'input has no value and shows placeholder'
  );

  this.set('name', 'ACME');
  assert.equal(
    this.$('[data-test-selector="company-name-input"]').val(),
    'ACME',
    'input shows name'
  );
});
