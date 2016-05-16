import Ember from 'ember';

const {
  RSVP: { hash },
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  sessionAccount: service(),
  model() {
    let userId = this.get('sessionAccount.account.id');
    return hash({
      user: this.store.peekRecord('user', userId)
    });
  },

  actions: {
    updateUser(attrs) {
      let flashMessages = this.get('flashMessages');
      let { user } = this.modelFor('users.edit');
      user.setProperties(attrs);
      user.save()
        .then(() => flashMessages.success('User has been updated.'))
        .catch(({ errors }) => flashMessages.warning(errors));
    }
  }
});
