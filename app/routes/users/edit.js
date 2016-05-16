import Ember from 'ember';

const {
  RSVP: { hash },
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  ajax: service(),
  sessionAccount: service(),
  model() {
    let userId = this.get('sessionAccount.account.id');
    return hash({
      user: this.store.peekRecord('user', userId)
    });
  },

  actions: {
    updateUser(attrs) {
      let ajax = this.get('ajax');
      let flashMessages = this.get('flashMessages');
      let { user } = this.modelFor('users.edit');
      let data = {
        data: {
          id: user.id,
          type: 'users',
          attributes: {
            email: attrs.email,
            password: attrs.password,
            'password-confirmation': attrs.passwordConfirmation
          }
        }
      };

      return ajax.patch(`/users/${user.id}`, {
        contentType: 'application/vnd.api+json',
        data: JSON.stringify(data)
      })
      .then(() => flashMessages.success('User has been updated.'))
      .catch(({ errors }) => {
        let messages = errors.map(error => error.detail).join(' ');
        flashMessages.warning(messages);
      });
    }
  }
});
