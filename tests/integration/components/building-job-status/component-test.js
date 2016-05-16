import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('building-job-status', 'Integration | Component | building job status', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{building-job-status}}`);

  assert.equal(this.$().text().trim(), 'No Jobs.');

  // Template block usage:
  this.render(hbs`
    {{#building-job-status}}
      template block text
    {{/building-job-status}}
  `);

  assert.equal(this.$().text().trim(), 'No Jobs.');
});
