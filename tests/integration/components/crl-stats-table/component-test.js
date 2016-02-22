import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('crl-stats-table', 'Integration | Component | crl stats table', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{crl-stats-table}}`);

  // assert.equal(this.$().text().trim(), '');
  assert.equal(this.$('.table-title').text().trim(), 'CRL Data');

});