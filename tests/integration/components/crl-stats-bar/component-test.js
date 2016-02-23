import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('crl-stats-bar', 'Integration | Component | crl stats bar', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{crl-stats-bar}}`);

  assert.equal(this.$('.chart-header').text().trim(), 'Vertical Bar Chart');

});
