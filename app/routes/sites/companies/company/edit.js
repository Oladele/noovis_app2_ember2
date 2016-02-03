import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      company: this.modelFor('sites.companies.company'),
      sites: this.modelFor('sites.companies.company').get('networkSites')
    });
  },

  actions: {
    updateCompany(name) {
      const company = this.modelFor('sites.companies.company');
      company.set('name', name);
      return company.save();
    },

    deleteCompany() {
      return this.modelFor('sites.companies.company').destroyRecord();
    }
  }
});
