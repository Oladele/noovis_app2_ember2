import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),
  sessionAccount: service('session-account'),

  beforeModel() {
    this.get('sessionAccount').loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this.get('sessionAccount').loadCurrentUser()
      .catch(() => this.get('session').invalidate());
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
