import Ember from 'ember';

const {
  inject,
  RSVP
} = Ember;

export default Ember.Route.extend({
  ajax: inject.service(),
  model() {
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

    return building.get('sheets')
      .then(sheets => sheets.reload())
      .then(newSheets => newSheets.get('lastObject.cableRuns'))
      .then(runs => model.cableRuns = runs);
  }
});

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
