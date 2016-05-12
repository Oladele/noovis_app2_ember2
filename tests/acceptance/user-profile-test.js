import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';
import testSelector from 'noovis-app2-ember2/tests/helpers/ember-test-selectors';

let currentUser;

moduleForAcceptance('Acceptance | user profile', {
  beforeEach() {
    currentUser = server.create('user', { role: 'admin' });
    authenticateSession(this.application, { accountId: currentUser.id });
  }
});

test('should be able to change user email', function(assert) {
  let newEmail = 'anon@example.com';

  visit('/users/edit');
  fillIn(testSelector('selector', 'email-input'), newEmail);
  click(testSelector('selector', 'submit-button'));

  andThen(() => {
    let user = server.db.users[0];
    assert.equal(user.email, newEmail);
  });
});

test('should send password update in correct format', function(assert) {
  let password = 'secret!!';

  visit('/users/edit');
  fillIn(testSelector('selector', 'password-input'), password);
  fillIn(testSelector('selector', 'passwordConfirmation-input'), password);
  click(testSelector('selector', 'submit-button'));

  return server.patch(`/users/${currentUser.id}`, (schema, request) => {
    let { data } = JSON.parse(request.requestBody);
    assert.equal(data.attributes['password'], password);
    assert.equal(data.attributes['password-confirmation'], password);
  });
});
