import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),

  actions: {
    authenticate(email, password) {
      let authenticator = 'authenticator:token';
      let session = this.get('session');
      session.authenticate(authenticator, email, password)
        .catch(({ error }) => this.set('error', error));
    }
  }
});
