import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('crl-stats-pie', 'Integration | Component | crl stats pie', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{crl-stats-pie}}`);

  assert.equal(this.$('.chart-title').text().trim(), 'PON Channel Utilization');
});