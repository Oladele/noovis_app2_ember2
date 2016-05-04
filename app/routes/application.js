import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),
  sessionAccount: service(),

  beforeModel() {
    return this.get('sessionAccount').loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this.get('sessionAccount').loadCurrentUser()
      .catch(() => this.get('session').invalidate());
  },

  actions: {
    didTransition() {
      this.controller.set('session', this.get('session'));
    },

    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
