import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import testSelector from 'noovis-app2-ember2/tests/helpers/ember-test-selectors';
import { authenticateSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';

let company;
let currentUser;

moduleForAcceptance('Acceptance | users', {
  beforeEach() {
    currentUser = server.create('user', { role: 'admin' });
    authenticateSession(this.application, { accountId: currentUser.id });
    company = server.create('company', { name: 'Noovis' });
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

  andThen(() => {
    let user = server.db.users.where({ email })[0];
    assert.equal(currentURL(), '/admin/users', 'transitioned to correct path');
    assert.equal(user.email, email, 'has correct email');
    assert.equal(user.role, role.toLowerCase(), 'has correct role');
  });
});

test('should update user', function(assert) {
  let newCompany = server.create('company', { name: 'Princeton' });
  let user = company.createUser({
    email: 'user@example.com',
    role: 'admin'
  });
  let newRole = 'User';

  visit(`/admin/users/${user.id}`);
  select('.role-select', newRole);
  select('.company-select', 'Princeton');
  click(testSelector('selector', 'submit-button'));

  andThen(function() {
    user = server.db.users.where({ email: user.email })[0];
    assert.equal(user.role, newRole.toLowerCase(), 'updated role');
    assert.equal(user.companyId, newCompany.id, 'updated company');
  });
});
