import Ember from 'ember';
import { CanMixin } from 'ember-can';

const {
  inject,
  get,
  RSVP,
} = Ember;

export default Ember.Route.extend(CanMixin, {
  ajax: inject.service(),
  beforeModel() {
    if (!this.can('write user')) {
      this.transitionTo('admin.users');
    }
  },

  model() {
    return RSVP.hash({
      companies: this.store.findAll('company'),
    });
  },

  actions: {
    createUser(attrs) {
      let ajax = get(this, 'ajax') ;

      let data = {
        data: {
          type: 'users',
          attributes: {
            email: attrs.email,
            role: attrs.role,
            password: attrs.password,
            "password-confirmation": attrs.passwordConfirmation
          },
          relationships: {
            company: {
              data: {
                type: 'companies',
                id: get(attrs.company, 'id')
              }
            }
          }
        }
      };

      return ajax.post('/users', {
        contentType: 'application/vnd.api+json',
        data: JSON.stringify(data)
      })
      .then(() => this.transitionTo('admin.users.index'))
      .catch(({ errors }) => this.controller.set('errors', errors));
    }
  }
});
