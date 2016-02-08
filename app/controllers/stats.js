import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
import {getData, getDataHeadings} from './stats_data_TEMP';

export default Ember.Controller.extend({

  tableHeadings: getDataHeadings(),
  tableData: getData(),

  tableColumn: function(columnName){
    const column = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: columnName.target,
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
    console.log("content: ", content);
    return content;
  })
});