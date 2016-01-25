/* global google */
import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({
  gMap: inject.service('gMap'),

  didInsertElement() {
    this._super(...arguments);
    let input = this.$('.searchTextField')[0];
    let autocomplete = new google.maps.places.Autocomplete(input);
    this.set('autocomplete', autocomplete);

    autocomplete.addListener('place_changed', () => {
      let place = this.get('autocomplete').getPlace();
      this['onComplete'](place);
    });

    input.addEventListener('keydown', () => console.log('typed in address field'));
  },

  willDestroyElement() {
    // TODO: confirm proper way to clear listeners
    const input = this.get('autocomplete');
    google.maps.event.clearInstanceListeners(input);
    this.set('autocomplete', null);
  }
});
