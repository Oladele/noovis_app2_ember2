import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { resolve } = Ember.RSVP;

class SiteFormPageObject {
  constructor(env) {
    this.env = env;
  }

  clickSubmit() {
    this.env.$('[data-test-selector=submit-button]').click();
    return this;
  }

  clickDelete() {
    this.env.$('[data-test-selector=delete-button]').click();
    return this;
  }
}

moduleForComponent('network-site-form', 'Integration | Component | network site form', {
  integration: true
});

test('it submits `Update` button click', function(assert) {
  assert.expect(1);

  let place = {
    formatted_address: 'foo',
    geometry: {
      location: {
        lat() {},
        lng() {}
      }
    }
  };
  this.set('place', place);

  this.set('updateSite', () => {
    assert.ok(true, 'triggered parent update');
    return resolve();
  });

  this.render(hbs`{{network-site-form place=place onSubmit=updateSite}}`);

  new SiteFormPageObject(this)
    .clickSubmit();

  this.set('submit', () => {
    assert.ok(true, 'triggered external submit action');
  });
});

test('it triggers delete on `Delete` button click', function(assert) {
  assert.expect(1);

  this.set('destroySite', () => {
    assert.ok(true, 'triggered parent destroy action');
    return resolve();
  });
  this.render(hbs`{{network-site-form onDelete=(action destroySite) isEditing=true}}`);

  new SiteFormPageObject(this)
    .clickDelete();
});

test('it only shows `Delete` button when editing', function(assert) {
  assert.expect(2);

  this.set('state', false);
  this.render(hbs`{{network-site-form isEditing=state}}`);

  assert.equal(this.$('[data-test-selector=delete-button]').length, 0, 'defaults to not showing delete button');

  this.set('state', true);
  assert.equal(this.$('[data-test-selector=delete-button]').length, 1, 'shows delete button when editing');
});

test('it shows current site info when editing', function(assert) {
  assert.expect(1);

  let name = 'foo';
  let address = 'bar';
  this.set('name', name);
  this.set('address', address);

  this.render(hbs`{{network-site-form name=name address=address}}`);

  assert.equal(this.$('[data-test-selector=site-name-input]').val(), name, 'show current name in name input');
  // assert.equal(this.$('#basic-autocomplete input').val(), address, 'show current value in address input');
});
