import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('buildings-list', 'Integration | Component | buildings list', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{buildings-list}}`);

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#buildings-list}}
      template block text
    {{/buildings-list}}
  `);

  assert.ok(true);
});
