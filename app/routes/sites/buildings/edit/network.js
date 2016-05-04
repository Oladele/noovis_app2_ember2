import Ember from 'ember';

const {
  inject,
  RSVP
} = Ember;

export default Ember.Route.extend({
  ajax: inject.service(),
  model() {
    let id = this.paramsFor('sites.buildings.edit').building_id;
    let { building } = this.modelFor('sites.buildings.edit');
    let cableRuns = building.get('sheets')
      .then(sheets => sheets.reload())
      .then(newSheets => newSheets.get('lastObject.cableRuns'));
    let graph = this.get('ajax').request(`buildings/${id}/latest_network_graph`)
      .then(results => results, () => emptyGraph);

    return RSVP.hash({
      building,
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

const emptyGraph = {
  data: {
    id: null,
    attributes: {
      nodes: [],
      edges: []
    }
  }
};
