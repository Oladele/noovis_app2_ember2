import Ember from 'ember';

const {
  getProperties,
  get
} = Ember;

export default Ember.Component.extend({
  roles: ['admin', 'user', 'customer'],

  actions: {
    submit() {
      let props = getProperties(this, 'email', 'company', 'role');
      let user = get(this, 'user');
      this.get('onSubmit')(user, props);
    }
  }
});
