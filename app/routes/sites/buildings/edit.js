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
      networkTreeData: this.get('ajax').request(`buildings/${params.building_id}/latest_network_graph`)
    });
  },

  afterModel(model) {
    let building = model.building;
    model.cableRuns = {
      content: [],
      columns: [
        ColumnDefinition.create({
          headerCellName: 'No sheets found',
          textAlign: 'text-align-left',
          getCellContent(row) {
            return row.get(type);
          }
        })
      ]
    };

    let { nodes, edges } = model.networkTreeData.data.attributes;
    model.networkTreeData = { nodes, edges };

    return building.get('sheets')
      .then(sheets => sheets.get('lastObject.cableRuns'))
      .then(runs => {
        let content = runs;
        let headers = [];
        runs.objectAt(0).eachAttribute(attr => headers.push(attr));
        let columns = createTableColumns(headers);
        model.cableRuns = { content: content, columns: columns };
      })
      .catch(({ errors }) => this.set('errors', errors));
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
