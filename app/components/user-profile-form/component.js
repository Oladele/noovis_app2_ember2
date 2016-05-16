import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submit() {
      let attrs = this.getProperties('email', 'password', 'passwordConfirmation');
      this.get('onSubmit')(attrs);
    }
  }
});
