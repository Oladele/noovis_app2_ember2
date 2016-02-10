import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submit() {
      let building = this.get('building');
      let name = this.get('name');
      let description = this.get('description');
      let lat = this.get('lat');
      let lng = this.get('lng');

      this.get('onSubmit')({ building, name, description, lat, lng })
        .catch(({ errors }) => this.set('errors', errors));
    }
  }
});
