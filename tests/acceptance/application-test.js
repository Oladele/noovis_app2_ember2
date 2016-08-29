import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | application', {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/sites');

    assert.equal(
        find('[data-test-selector="sites-link"]').attr('href'),
        "/sites",
        "Header contains link to Sites");
  });


});
