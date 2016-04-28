import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    let { building } = this.modelFor('sites.buildings.edit');
    let sheets = building.get('sheets')
      .then(sheets => sheets.reload())
      .then(newSheets => newSheets);

    return RSVP.hash({
      building,
      sheets
    });
  },

  actions: {
    refreshFileList() {
      this.refresh();
    }
  }
});
