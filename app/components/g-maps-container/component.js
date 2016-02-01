import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  lat: 37.0625,
  lng: -95.677068,
  zoom: 4,
  markers: computed('model.[]', function() {
    let model = this.get('model');
    let markers = Ember.A();
    if (model.get('networkSites') !== undefined) {
      // company.edit
      model.get('networkSites').then(sites => markers.pushObjects(this._formatData(sites)));
    } else {
      // sites.index
      model.forEach(company => {
        company.get('networkSites').then(sites => markers.pushObjects(this._formatData(sites)));
      });
    }

    return markers;
  }),

  _formatData(sites) {
    return sites.map(site => {
      return {
        id: site.get('id'),
        lat: site.get('lat'),
        lng: site.get('lng'),
        infoWindow: {
          content: site.get('name')
        }
      };
    });
  }
});
