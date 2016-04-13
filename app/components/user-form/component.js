import Ember from 'ember';

const {
  getProperties,
} = Ember;

export default Ember.Component.extend({
  roles: ['admin', 'user', 'customer'],

  actions: {
    submit() {
      let attrs = getProperties(this, 'email', 'company', 'role', 'password', 'passwordConfirmation');
      this.get('onSubmit')(attrs);
    }
  }
});
