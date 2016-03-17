import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';

const {
  inject,
  RSVP
} = Ember;


export default Ember.Route.extend({
  ajax: inject.service(),
  model(params) {
    let id = this.paramsFor('sites.buildings.edit').building_id;
    return RSVP.hashSettled({
      building: this.modelFor('sites.buildings.edit'),
      graph: this.get('ajax').request(`buildings/${id}/latest_network_graph`)
    })
    .then(results => initGraphData(results.graph))
    .catch(error => {
      this.set('error', error);
    });
  },

  afterModel(model) {
    let { nodes, edges } = model.data.attributes;
    model.nodes = nodes;
    model.edges = edges;

    let building = this.modelFor('sites.buildings.edit').building;
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

    return building.get('sheets')
      .then(sheets => sheets.reload())
      .then(newSheets => newSheets.get('lastObject.cableRuns'))
      .then(runs => {
        let content = runs;
        let headers = [];
        runs.objectAt(0).eachAttribute(attr => headers.push(attr));
        let columns = createTableColumns(headers);
        model.cableRuns = { content: content, columns: columns };
      })
      .catch(({ errors }) => this.set('errors', errors));
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

function initGraphData(data) {
  if (data.state === 'fulfilled') {
    return data.value;
  } else {
    return {
      data: {
        id: null,
        attributes: {
          nodes: [],
          edges: []
        }
      }
    };
  }
}
