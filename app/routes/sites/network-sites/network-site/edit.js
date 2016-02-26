import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';

const {
  computed
} = Ember;

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      site: this.modelFor('sites.network-sites.network-site'),
      buildings: this.modelFor('sites.network-sites.network-site').get('buildings'),
      tableColumns: this._tableColumns,
      tableContent: this._tableContent
    });
  },

  _tableColumns: computed(function() {
    let types = ['Bldgs', 'OLTs', 'PON Cards', 'FDHs', 'Splitters', 'RDTs', 'ONTs', 'WAPs', 'Rooms'];

    return types.map(type => {
      return ColumnDefinition.create({
        savedWidth: 100,
        headerCellName: type,
        getCellContent(row) {
          return row.get(type);
        }
      });
    });
  }),

  _tableContent: computed(function() {
    return [
      {
        "Bldgs":18,
        "OLTs":1,
        "PON Cards":5,
        "FDHs":13,
        "Splitters":50,
        "RDTs":390,
        "ONTs":986,
        "WAPs":719,
        "Rooms":1505,
        "Active Channels":986,
        "Standby Channels":614,
        "Active PON Ports":50,
        "Spare Feeder Fibers":106,
        "Active Distribution Ports":986,
        "Spare Distribution Ports":1006,
        "Actual RDT Count":null
      }
    ];
  }),

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
