import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let company = this.modelFor('sites.companies.company');
    let sites = this.modelFor('sites.companies.company').get('networkSites');
    return Ember.RSVP.hash({ company, sites });
  },

  actions: {
    updateCompany(company, name) {
      company.set('name', name);
      return company.save();
    },

    deleteCompany(company) {
      return company.destroyRecord();
    }
  }
});
