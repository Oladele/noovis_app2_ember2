import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submit() {
      let name = this.get('name');
      let description = this.get('description');
      this.get('onSubmit')(name, description);
    }
  }
});
