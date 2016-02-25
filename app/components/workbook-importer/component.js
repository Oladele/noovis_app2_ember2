import Ember from 'ember';

export default Ember.Component.extend({
  requestHeaders: {
    "Content-Type": "multipart/form-data"
  },
  actions: {
    loadWorkbook(files) {
      let reader = new FileReader();
      this.set('workbookFile', files[0]);

      reader.onload = (e) => {
        let data = e.target.result;
        let workbook = XLSX.read(data, {type: 'binary'});
        this.set('sheetNames', workbook.SheetNames);
      };
      reader.readAsBinaryString(files[0])
    },

    importWorkbook() {
      let sheetName = this.get('sheetName');
      let file = this.get('workbookFile');
      let buildingId = this.get('buildingId');
      let data = new FormData();
      data.append('sheet', sheetName);
      data.append('building_id', buildingId);
      data.append('file', file);
      this.set('requestData', data);
    }
  }
});
