import Ember from 'ember';

const {
  inject,
  RSVP,
  isEmpty,
  get
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
    let cableRuns = building.get('sheets')
      .then(sheets => sheets.reload())
      .then(newSheets => {
        return isEmpty(newSheets) ? { cableRuns: [] } : newSheets.get('lastObject');
      }) 
      .then(sheet => get(sheet, 'cableRuns'));
    let graph = this.get('ajax').request(`buildings/${id}/latest_network_graph`);

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
    if (model.graph.graph) {
      model.nodes = [];
      model.edges = [];
    } else {
      let { nodes, edges } = model.graph.data.attributes;
      model.nodes = nodes;
      model.edges = edges;
    }
  }
});

