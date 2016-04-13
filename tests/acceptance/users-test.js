import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import testSelector from 'noovis-app2-ember2/tests/helpers/ember-test-selectors';

let company;

moduleForAcceptance('Acceptance | users', {
  beforeEach() {
    server.create('company', { name: 'Noovis' });
  }
});

test('should create a new user', function(assert) {
  let email = 'user@example.com';
  let password = 'secret';
  let role = 'Admin';
  visit('/admin/users/new');
  fillIn(testSelector('selector', 'email-input'), email);
  fillIn(testSelector('selector', 'password-input'), password);
  fillIn(testSelector('selector', 'passwordConfirmation-input'), password);
  select('.company-select', 'Noovis');
  select('.role-select', role);
  click(testSelector('selector', 'submit-button'));

  andThen(function() {
    let user = server.db.users[0];
    assert.equal(currentURL(), '/admin/users', 'transitioned to correct path');
    assert.equal(user.email, email, 'has correct email');
    assert.equal(user.role, role.toLowerCase(), 'has correct role');
  });
});
