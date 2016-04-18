import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      users: this.store.findAll('user')
    });
  },

  actions: {
    destroyUser(user) {
      user.destroyRecord()
        .catch(({ errors }) => this.controller.set('errors', errors));
    }
  }
});
