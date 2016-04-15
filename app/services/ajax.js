import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';
import Ember from 'ember';

const {
  computed,
  inject: { service },
} = Ember;

export default AjaxService.extend({
  host: ENV.apiHost,
  session: service(),
  headers: computed('session.data.authenticated.access_token', {
    get() {
      let headers = {};
      let token = this.get('session.data.authenticated.access_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      return headers;
    }
  })
});
