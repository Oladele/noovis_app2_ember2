import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    let building = this.modelFor('sites.buildings.edit').building;
    return RSVP.hash({
      building,
      sheets: building.get('sheets')
    });
  },

  afterModel(model) {
    let sheets = model.sheets;
    return sheets.reload()
      .then(newSheets => {
        model.sheets = newSheets;
      });
  },

  actions: {
    refreshFileList() {
      this.refresh();
    }
  }
});
