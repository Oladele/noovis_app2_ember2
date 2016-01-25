import Ember from 'ember';

export default Ember.Component.extend({
  // TODO: should children ever bubble actions through parent into route?
  actions: {
    submit() {
      const place = this.get('place');
      const address = place.formatted_address;
      const location = place.geometry.location;

      const data = {
        name: this.get('name'),
        lat: location.lat(),
        lng: location.lng(),
        address
      };

      this['onSubmit'](data);
    },

    placeChanged(place) {
      this['onPlaceUpdate'](place);
    },

    deleteSite() {
      this.attrs.onDelete()
        .catch(({ errors }) => this.set('errors', errors));
    }
  }
});
