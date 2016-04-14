import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model(params) {
    return RSVP.hash({
      user: this.store.findRecord('user', params.user_id),
      companies: this.store.findAll('company')
    });
  },

  actions: {
    updateUser(attrs) {
      let flashMessages = this.get('flashMessages');
      let { user } = this.modelFor('admin.users.edit');
      for (let key in attrs) {
        if (attrs[key] === undefined) {
          delete attrs[key];
        }
      }

      user.setProperties(attrs);
      user.save()
        .then(flashMessages.success('User has been updated.'))
        .catch(({errors}) => flashMessages.warning(errors));
    }
  }
});
