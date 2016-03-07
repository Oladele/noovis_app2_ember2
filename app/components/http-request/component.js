import Ember from 'ember';
import Component from 'emberx-xml-http-request/components/x-xml-http-request';
import layout from 'emberx-xml-http-request/templates/components/x-xml-http-request';

export default Component.extend({
  layout: layout,

  sendResponse: Ember.observer('model.reponse', function() {
    let message = this.get('model.response.message');
    let status = this.get('model.status');
    if (status || message) {
      this.get('onResponse')(status, message);
    }
  })
});
