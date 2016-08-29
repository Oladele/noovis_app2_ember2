/* global XLSX */
import Ember from 'ember';
import ENV from '../../config/environment';
import { task, timeout } from 'ember-concurrency';

const {
  computed,
  inject: { service }
} = Ember;

export default Ember.Component.extend({
  session: service(),
  buildingJobStatus: Ember.inject.service(),
  sheetNames: ['Upload a Workbook'],
  requestURL: `${ENV.apiHost}/import_cable_run`,
  requestHeaders: computed('session.data.authenticated', function() {
    let { accessToken, client, expiry, uid, tokenType } = this.get('session.data.authenticated');
    return {
      contentType: false,
      client,
      expiry,
      uid,
      'access-token': accessToken,
      'token-type': tokenType,
    };
  }),

  // TODO:
  // When we fetch the file list right after server response, it does
  // not contain our newly uploaded file yet. Here, we're inserting a delay
  // until we find a better solutions. 3s seems sufficient in the current
  // (May 6, 2016) environment.
  //
  // The number of records for the sheet may be lower than the actual number
  // of records while server is processing the file.
  refreshListTask: task(function * () {
    yield timeout(3000);
    this.get('onComplete')();
  }),

  actions: {
    loadWorkbook(files) {
      let reader = new FileReader();
      this.set('file', files[0]);

      reader.onload = (e) => {
        let arrayBuffer = e.target.result;
        let data = new Uint8Array(arrayBuffer);
        let bstr = data.reduce((acc, char) => {
          return acc + String.fromCharCode(char);
        }, '');
        let workbook = XLSX.read(bstr, { type: 'binary' });
        let sheetNames = workbook.SheetNames;
        this.set('sheetNames', sheetNames);
        this.set('sheetName', sheetNames[0]);
      };
      reader.readAsArrayBuffer(files[0]);
    },

    importWorkbook() {
      let sheetName = this.get('sheetName');
      let file = this.get('file');
      let buildingId = this.get('buildingId');
      let formData = new FormData();
      formData.append('file', file);
      formData.append('building_id', buildingId);
      formData.append('sheet', sheetName);
      this.set('requestData', formData);
    },

    notifyFlash(status, message) {
      this.get('onFlashReceive')(status, message);
      this.get('refreshListTask').perform();
      // action
      this.get('buildingJobStatus').checkNow();
    }
  }
});
