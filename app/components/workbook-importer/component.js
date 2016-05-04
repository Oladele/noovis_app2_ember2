import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  buildingJobStatus: Ember.inject.service(),
  sheetNames: ['Upload a Workbook'],
  requestURL: `${ENV.apiHost}/import_cable_run`,
  requestHeaders: {
    contentType: false
  },
  actions: {
    loadWorkbook(files) {
      let reader = new FileReader();
      this.set('file', files[0]);

      reader.onload = (e) => {
        let data = e.target.result;
        let workbook = XLSX.read(data, {type: 'binary'});
        let sheetNames = workbook.SheetNames;
        this.set('sheetNames', sheetNames);
        this.set('sheetName', sheetNames[0]);
      };
      reader.readAsBinaryString(files[0]);
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
      this.get('onComplete')();
      // action
      this.get('buildingJobStatus').checkNow();
    }
  }
});
