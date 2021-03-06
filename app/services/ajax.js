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
  contentType: 'application/vnd.api+json',
  headers: computed('session.data.authenticated', {
    get() {
      let headers = {};
      headers.accept = 'application/vnd.api+json';
      let { accessToken, client, expiry, uid, tokenType} = this.get('session.data.authenticated');
      if (accessToken) {
        headers['access-token'] = accessToken;
        headers['token-type'] = tokenType;
        headers['client'] = client;
        headers['expiry'] = expiry;
        headers['uid'] = uid;
      }
      return headers;
    }
  })
});
