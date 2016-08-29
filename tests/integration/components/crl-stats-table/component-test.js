import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('crl-stats-table', 'Integration | Component | crl stats table', {
  integration: true
});

test('it renders', function(assert) {
  this.set('headers', []);
  this.set('content', []);
  this.render(hbs`{{crl-stats-table headers=headers tableContent=content}}`);

  assert.equal(this.$('.table-title').text().trim(), 'Network Elements Counts');
});
