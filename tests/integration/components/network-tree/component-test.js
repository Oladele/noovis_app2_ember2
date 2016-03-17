import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('network-tree', 'Integration | Component | network tree', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{network-tree}}`);

  assert.ok(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#network-tree}}
      template block text
    {{/network-tree}}
  `);

  assert.ok(this.$().text().trim(), 'template block text');
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
