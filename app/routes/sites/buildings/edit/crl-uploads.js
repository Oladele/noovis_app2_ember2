import Ember from 'ember';
import { CanMixin } from 'ember-can';

const {
  RSVP
} = Ember;

export default Ember.Route.extend(CanMixin, {
  beforeModel() {
    if (!this.can('read cableRun')) {
      this.transitionTo('sites.buildings.edit.map');
    }
  },

  breadCrumb: {
    title: 'CRL Uploads'
  },

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
