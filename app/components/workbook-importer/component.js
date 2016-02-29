/* global XLSX */
import Ember from 'ember';

export default Ember.Component.extend({
  sheetNames: ['Upload a Workbook'],
  requestHeaders: {
    "Content-Type": "multipart/form-data"
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
      let data = new FormData();
      data.append('sheet', sheetName);
      data.append('building_id', buildingId);
      data.append('workbookFile', file);
      this.set('requestData', data);
    }
  }
});
