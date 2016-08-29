import Ember from 'ember';

const {
  isEmpty,
  RSVP,
  inject: {
    service
  }
} = Ember;

export default Ember.Service.extend({
  session: service(),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      // session data is set in `authenticate` success handler in authenticator
      let accountId = this.get('session.data.authenticated.accountId');
      if (!isEmpty(accountId)) {
        return this.get('store').findRecord('user', accountId).then(user => {
          this.set('account', user);
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  }
});
