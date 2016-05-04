import Ember from 'ember';
import { CanMixin } from 'ember-can';

const {
  RSVP
} = Ember;

export default Ember.Route.extend(CanMixin, {
  beforeModel() {
    if (!this.can('write networkSite')) {
      this.transitionTo('sites.companies.company.edit');
    }
  },

  model() {
    return RSVP.hash({
      sites: this.modelFor('sites.companies.company').get('networkSites'),
      site: this.store.createRecord('networkSite')
    });
  },

  actions: {
    submit(data) {
      const { id } = this.paramsFor('sites.companies.company');
      data.company = this.store.peekRecord('company', id);
      return this.store.createRecord('network-site', data)
        .save()
        .then(site => this.transitionTo('sites.network-sites.network-site.edit', site.id))
        .catch(({ errors }) => this.controller.set('errors', errors));
    },

    didUpdatePlace(place) {
      this.controller.setProperties({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        zoom: 16,
        place
      });
    }
  }
});
