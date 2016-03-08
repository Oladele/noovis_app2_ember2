import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';

const {
  inject,
  RSVP
} = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  ajax: inject.service(),
  model(params) {
    let sheetId = 1;
    return RSVP.hash({
      building: this.store.findRecord('building', params.building_id),
      networkTreeData: this.get('ajax').request(`/buildings/${params.building_id}/show_network_graph`),
      cableRuns: this.get('ajax').request(`/sheets/${sheetId}/cable_runs`)
    });
  },

  afterModel(model) {
    let cableRuns = model.cableRuns.data;
    let content = cableRuns.map(cableRun => cableRun.attributes);
    let columnData = Object.keys(cableRuns[0].attributes);
    let columns = createTableColumns(columnData);
    model.cableRuns = { content, columns };
  },

  actions: {
    submit(params) {
      let { building, name, description, lat, lng } = params;
      building.setProperties({ name, description, lat, lng });
      return building.save();
    },

    destroyBuilding(building) {
      return building.destroyRecord();
    },

    sendFlash(status, message) {
      let flashMessages = this.get('flashMessages');
      if (status >= 200 && status < 300) {
        let text = message || 'Success';
        flashMessages.success(text);
        return;
      }

      if (status >= 400 && status < 500) {
        let text = message || 'Client Error';
        flashMessages.warning(text);
        return;
      }

      if (status >= 500) {
        flashMessages.warning('Server Error: Please try again later');
        return;
      }
    }
  }
});

function createTableColumns(types) {
  return types.map(type => {
    return ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: type,
      getCellContent(row) {
        return row.get(type);
      }
    });
  });
}
