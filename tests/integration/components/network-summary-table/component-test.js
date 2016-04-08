import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  computed
} = Ember;

moduleForComponent('network-summary-table', 'Integration | Component | network summary table', {
  integration: true
});

test('should render', function(assert) {
  let cableRuns = ['foo', 'bar'].map(name => {
    return Ember.Object.extend({
      site: name
    }).create();
  });

  this.set('model', cableRuns);
  this.set('headers', ['site']);
  
  this.render(hbs`
    {{network-summary-table cableRuns=model headers=headers}}
  `);

  assert.equal($('tbody tr').length, 2, 'found 2 rows');
});

test('should notify parent with selected row', function(assert) {
  let id = 1;

  let cableRun = Ember.Object.extend({
    id,
    site: 'foo'
  }).create();

  this.set('model', [cableRun]);
  this.set('headers', ['site']);
  this.set('filterGraph', (_id) => {
    assert.equal(_id, id, 'sent run id');
  });

  this.render(hbs`
    {{network-summary-table cableRuns=model headers=headers onSelect=(action filterGraph)}}
  `);

  this.$('tbody tr').click();
});
