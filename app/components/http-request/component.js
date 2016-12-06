import Ember from 'ember';
import Component from 'emberx-xml-http-request/components/x-xml-http-request';
import layout from 'emberx-xml-http-request/templates/components/x-xml-http-request';

export default Component.extend({
  layout: layout,

  // TODO: Consider removing checks for `responseText`.
  // Only applies for Mirage responses.
  sendResponse: Ember.observer('model.response', function() {
    let hasResponseText = Object.keys(this.get('model.xhr')).includes('responseText');
    let responseText = hasResponseText ? JSON.parse(this.get('model.xhr.responseText')) : '';
    let message = responseText ? responseText.message : this.get('model.response.message');
    let status = this.get('model.status');
    if (status && message) {
      this.get('onResponse')(status, message);
    }
  })
});
