import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import testSelector from 'noovis-app2-ember2/tests/helpers/ember-test-selectors';
import { authenticateSession, currentSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | login');

test('should login', function(assert) {
  let email = 'steve@acme.com';
  let password = 'secret';
  visit('/login');

  fillIn(testSelector('selector', 'email-input'), email);
  fillIn(testSelector('selector', 'password-input'), password);
  click(testSelector('submit-button'));

  andThen(() => {
    assert.equal(currentURL(), '/sites', 'redirected to /sites');
  });
});

test('should log out', function(assert) {
  authenticateSession(this.application);
  let session = currentSession(this.application);

  visit('/sites');

  andThen(() => {
    let data = { authenticator: 'authenticator:test' };
    assert.deepEqual(session.get('data.authenticated'), data, 'session authenticated');
  });

  click(testSelector('sign-out-link'));

  andThen(() => {
    // sessionInvalidated does not transition when testing; don't assert on URL
    assert.deepEqual(session.get('data.authenticated'), {}, 'session was invalidated');
  });
});
