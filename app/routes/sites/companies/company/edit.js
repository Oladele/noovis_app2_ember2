import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let company = this.modelFor('sites.companies.company');
    let sites = this.modelFor('sites.companies.company').get('networkSites');
    return Ember.RSVP.hash({ company, sites });
  },

  actions: {
    updateCompany(company, name) {
      let flash = this.get('flashMessages');
      company.set('name', name);
      return company.save()
        .then(() => flash.success('Company was updated.'))
        .catch(errors => flash.warning(errors));
    },

    deleteCompany(company) {
      return company.destroyRecord()
        .then(() => {
          this.transitionTo('sites');
          let flashMessages = this.get('flashMessages');
          flashMessages.success('Company was deleted.');
        })
        .catch(({ errors }) => this.set('errors', errors));
    }
  }
});
