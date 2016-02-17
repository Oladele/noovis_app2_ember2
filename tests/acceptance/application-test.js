import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    assert.equal(
        find('[data-test-selector="sites-link"]').attr('href'),
        "/sites",
        "Header contains link to Sites");

    assert.equal(
        find('[data-test-selector="stats-link"]').attr('href'),
        "/stats",
        "Header contains link to Stats");
  });


});