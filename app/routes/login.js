import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { task } from 'ember-concurrency';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),

  authenticateTask: task(function * (email, password) {
    let authenticator = 'authenticator:application';
    let session = this.get('session');
    let credentials = {
      password,
      identification: email,
    };
    yield session.authenticate(authenticator, credentials)
      .catch(({ errors }) => { 
        let flashMessages = this.get('flashMessages');
        flashMessages.warning(errors[0])
      });
  }).drop(),

  actions: {
    didTransition() {
      this.controller.set('authenticateTask', this.get('authenticateTask'));
    },

    authenticate(email, password) {
      this.get('authenticateTask').perform(email, password);
    }
  }
});
