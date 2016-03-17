import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
import Stats from 'noovis-app2-ember2/helpers/_networkSites-edit-data';

const {
  RSVP,
  inject
} = Ember;

export default Ember.Route.extend({
  ajax: inject.service(),
  model() {
    // let ajax = this.get('ajax');
    // let siteId = this.paramsFor('sites.network-sites.network-site').id;
    return RSVP.hash({
      site: this.modelFor('sites.network-sites.network-site'),
      buildings: this.modelFor('sites.network-sites.network-site').get('buildings'),
      // tableContent: ajax.request(`/network-sites/${siteId}/stats-content`),
      // tableColumns: ajax.request(`/network-sites/${siteId}/stats-columns`)
      // TODO: remove stub
      tableContent: Stats.columns,
      tableColumns: Stats.headers
    });
  },

  afterModel(model) {
    let tableColumns = createTableColumns(model.tableColumns);
    model.tableColumns = tableColumns;
  },

  actions: {
    submit(data) {
      const site = this.modelFor(this.routeName).site;
      site.setProperties(data);

      return site.save();
    },

    didUpdatePlace(place) {
      this.controller.setProperties({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        zoom: 16,
        place
      });
    },

    deleteNetworkSite(site) {
      return site.destroyRecord();
    },

    deleteBuilding(building) {
      return building.destroyRecord();
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
