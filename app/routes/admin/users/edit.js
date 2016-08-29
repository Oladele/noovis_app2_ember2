import Ember from 'ember';
import { CanMixin } from 'ember-can';

const {
  RSVP,
  inject: { service }
} = Ember;

export default Ember.Route.extend(CanMixin, {
  ajax: service(),
  beforeModel() {
    if (!this.can('write user')) {
      this.transitionTo('admin.users');
    }
  },

  model(params) {
    return RSVP.hash({
      user: this.store.findRecord('user', params.user_id),
      companies: this.store.findAll('company')
    });
  },

  actions: {
    updateUser(attrs) {
      let ajax = this.get('ajax');
      let flashMessages = this.get('flashMessages');
      let { user } = this.modelFor('admin.users.edit');
      for (let key in attrs) {
        if (attrs[key] === undefined) {
          delete attrs[key];
        }
      }

      let data = {
        data: {
          id: user.id,
          type: 'users',
          attributes: {
            email: attrs.email,
            role: attrs.role,
            password: attrs.password,
            'password-confirmation': attrs.passwordConfirmation
          },
          relationships: {
            company: {
              data: {
                type: 'companies',
                id: attrs.company.get('id')
              }
            }
          }
        }
      };

      return ajax.patch(`/users/${user.id}`, {
        contentType: 'application/vnd.api+json',
        data: JSON.stringify(data)
      })
      .then(() => flashMessages.success('User has been updated.'))
      .catch(({ errors }) => {
        let messages = errors.map(error => error.detail).join(' ');
        flashMessages.warning(messages);
      });
    }
  }
});
