import Ember from 'ember';

const {
  inject,
  RSVP
} = Ember;

const emptyGraph = {
  data: {
    id: null,
    attributes: {
      nodes: [],
      edges: []
    }
  }
};

export default Ember.Route.extend({
  ajax: inject.service(),
  model() {
    let id = this.paramsFor('sites.buildings.edit').building_id;
    let { building } = this.modelFor('sites.buildings.edit');
    let latestSheet = building.get('sheets')
      .then(sheets => sheets.reload())
      .then(newSheets => newSheets.get('lastObject'));
    let cableRuns = latestSheet.then(sheet => sheet.get('cableRuns'));
    let graph = this.get('ajax').request(`buildings/${id}/latest_network_graph`)
      .then(results => results, () => emptyGraph);

    return RSVP.hash({
      building,
      latestSheet,
      cableRuns,
      graph
    })
    .catch(error => {
      this.set('error', error);
    });
  },

  afterModel(model) {
    let { nodes, edges } = model.graph.data.attributes;
    model.nodes = nodes;
    model.edges = edges;
  }
});

