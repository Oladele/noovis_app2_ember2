import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('network-tree', 'Integration | Component | network tree', {
  integration: true
});

test('should have container div', function(assert) {
  this.set('edges', []);
  this.set('nodes', []);
  let selectorName = 'network-tree-container';
  this.set('selector', selectorName);

  this.render(hbs`
    {{network-tree edges=edges nodes=nodes containerSelector=selector}}
  `);

  assert.equal(
    this.$(`.${selectorName}`).length,
    1,
    'found container'
  );
});
