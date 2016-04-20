import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import Ember from 'ember';

const {
  RSVP: { Promise },
  isEmpty,
  inject: { service },
  run
} = Ember;

export default DeviseAuthenticator.extend({
  session: service(),
  serverTokenEndpoint: '/auth/sign_in',

  restore(data){
    if (!isEmpty(data.accessToken) && !isEmpty(data.expiry) &&
        !isEmpty(data.tokenType) && !isEmpty(data.uid) && !isEmpty(data.client)) {
      return Promise.resolve(data);
    } else {
      return Promise.reject();
    }
  },

  authenticate(credentials) {
    return new Promise((resolve, reject) => {
      let { identification, password } = credentials;
      let { identificationAttributeName } = this.getProperties('identificationAttributeName');
      let data = { password };
      data[identificationAttributeName] = identification;

      this.makeRequest(data).then(
        (response, status, xhr) => {
          let result = {
            accessToken: xhr.getResponseHeader('access-token'),
            expiry: xhr.getResponseHeader('expiry'),
            tokenType: xhr.getResponseHeader('token-type'),
            uid: xhr.getResponseHeader('uid'),
            client: xhr.getResponseHeader('client')
          };

          run(null, resolve, result);
        },
        xhr => run(null, reject, xhr.responseJSON || xhr.responseText)
      );
    });
  }
});
