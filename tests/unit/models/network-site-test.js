import { moduleForModel, test } from 'ember-qunit';

moduleForModel('network-site', 'Unit | Model | network site', {
  // Specify the other units that are required for this test.
  needs: ['model:company']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
