import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('network-tree', 'Integration | Component | network tree', {
  integration: true
});

test('should have container div', function(assert) {
  this.set('edges', []);
  this.set('nodes', []);
  this.render(hbs`{{network-tree edges=edges nodes=nodes}}`);
  assert.equal(
    this.$('[data-test-selector="network-tree-container"]').length,
    1,
    'found container'
  );
});
