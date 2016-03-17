import Ember from 'ember';

export default Ember.Component.extend({
  _defaultPlace() {
    let site = this.get('site');

    return {
      formatted_address: this.get('address'),
      geometry: {
        location: {
          lat() {
            return site.get('lat');
          },
          lng() {
            return site.get('lng');
          }
        }
      }
    };
  },

  actions: {
    submit() {
      let site = this.get('site');
      let place = this.get('place') || this._defaultPlace();
      let address = place.formatted_address || site.get('address');
      let location = place.geometry.location;
      let data = {
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
      this.get('onDelete')()
        .catch(({ errors }) => this.set('errors', errors));
    }
  }
});
