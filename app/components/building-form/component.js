import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submit() {
      let building = this.get('building');
      let name = this.get('name');
      let description = this.get('description');
      this.get('onSubmit')(building, name, description)
        .catch(({ errors }) => this.set('errors', errors));
    }
  }
});
