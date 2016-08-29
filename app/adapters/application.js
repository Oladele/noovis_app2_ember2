import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.apiHost,
  authorizer: 'authorizer:application',
  coalesceFindRequests: true,

  ajaxOptions() {
    let authorizer = this.get('authorizer');
    let sessionData = this.get('session.data.authenticated');
    Ember.assert("You're using the DataAdapterMixin without specifying an authorizer. Please add `authorizer: 'authorizer:application'` to your adapter.", Ember.isPresent(authorizer));

    let hash = this._super(...arguments);
    let { beforeSend } = hash;

    hash.beforeSend = (xhr) => {
      this.get('session').authorize(authorizer, () => {
        xhr.setRequestHeader('access-token', sessionData.accessToken);
        xhr.setRequestHeader('expiry', sessionData.expiry);
        xhr.setRequestHeader('token-type', sessionData.tokenType);
        xhr.setRequestHeader('uid', sessionData.uid);
        xhr.setRequestHeader('client', sessionData.client);
      });
      if (beforeSend) {
        beforeSend(xhr);
      }
    };
    return hash;
  }
});
