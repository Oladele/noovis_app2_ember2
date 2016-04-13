import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      user: this.store.createRecord('user'),
      companies: this.store.findAll('company'),
    });
  },

  actions: {
    createUser(user, props) {
      user.setProperties(props);

      return user.save()
        .then(this.transitionTo('admin.users'))
        .catch(({ errors }) => this.controller.set('errors', errors));
    }
  }
});
