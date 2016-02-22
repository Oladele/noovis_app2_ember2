import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
import {getData, getDataHeadings} from './stats_data_TEMP';

// Pie imports
import {asset_values, pon_utilization} from './stats_chartdata_TEMP';

export default Ember.Controller.extend({

  // ******
  // TABLE
  // ******
  tableHeadings: getDataHeadings(),
  tableData: getData(),

  tableColumn: function(columnName){
    const column = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: columnName.target,
      tableCellViewClass: 'stats-cell-warning',
      getCellContent: function(row) {
        return row.get(columnName.source);
      }
    });
    return(column);
  },

  tableColumns: Ember.computed('tableHeadings',function() {
    const tableHeadings = this.get("tableHeadings");
    const columns = [];
    const getColumn = this.get("tableColumn");

    tableHeadings.forEach(function(columnName){
      const column = getColumn(columnName);
      columns.pushObject(column);
    });

    return(columns);
  }),

  tableContent: Ember.computed(function() {
    const content = this.get("tableData");
    return content;
  }),

  // ******
  // Pie
  // ******

  // ---------
  // Default Settings
  // ---------

  maxNumberOfSlices: 8,
  minSlicePercent: 2,
  maxRadius: 250,
  labelWidthMultiplier: 0.25,
  selectedSeedColor: "rgb(0, 0, 65)",

  // ---------
  // Data Selection
  // ---------

  // availableDataSets: Ember.computed('rawDataHash', function() {
  //   return Ember.A(_.keys(this.get('rawDataHash')));
  // }),

  data: Ember.computed('rawDataHash', function() {
    return this.get('rawDataHash')['pon_utilization'];
  }),

  rawDataHash: Ember.computed(function() {
    return {
      asset_values: asset_values,
      pon_utilization: pon_utilization,
    };
  }),
});