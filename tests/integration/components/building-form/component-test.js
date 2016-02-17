import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('building-form', 'Integration | Component | building form', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{building-form}}`);

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#building-form}}
      template block text
    {{/building-form}}
  `);

  assert.ok(true);
});
