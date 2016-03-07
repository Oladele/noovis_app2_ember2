import Ember from 'ember';

export default Ember.Component.extend({
  sheetNames: ['Upload a Workbook'],
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
    }
  }
});
