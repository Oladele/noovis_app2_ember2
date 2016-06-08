import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  beforeModel() {
    if (!this.can('write company')) {
      this.transitionTo('sites');
    }
  },

  model() {
    return this.store.createRecord('company');
  },

  actions: {
    createCompany(company, name) {
      company.set('name', name);
      let flashMessages = this.get('flashMessages');
      return company.save()
        .then(resolvedCompany => {
          this.transitionTo('sites.companies.company.edit', resolvedCompany.id);
          flashMessages.success('Company was created.');
        })
        .catch(({ errors }) => {
          let messages = errors.map(error => error.detail);
          flashMessages.danger(messages.join(' '));
        });
    }
  }
});
