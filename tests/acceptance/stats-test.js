import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | stats');

test('visiting /stats', function(assert) {
  visit('/stats');

  andThen(function() {
    assert.equal(currentURL(), '/stats');
  });
});
