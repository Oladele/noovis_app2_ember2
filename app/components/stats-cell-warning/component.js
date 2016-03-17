import Ember from 'ember';
import TableCell from 'ember-table/components/table-cell';

export default TableCell.extend({
  classNames: "",
  classNameBindings: [
  	'isCalculatedColumn:stats-cell-warning',
  	'isUnknownColumn:stats-cell-danger'
  ],
  
  calculatedColumns: [
  	"Active Channels",
    "Standby Channels",
    "Active PON Ports",
    "Spare Feeder Fibers",
    "Active Distribution Ports",
    "Spare Distribution Ports",
  ],
  unknownColumns: ["Actual RDT Count"],
  row: Ember.computed.alias('parentView.row'),
  column: Ember.computed.alias('content'),
  
  columnName: Ember.computed('row', 'column', function(){
  	const column = this.get('column');
  	return column.headerCellName;
  }),

  isCalculatedColumn: Ember.computed('columnName', function(){
  	const calculatedColumns = this.get('calculatedColumns');
  	return this.isColumnNameInList(calculatedColumns);
  }),

  isUnknownColumn: Ember.computed('columnName', function(){
  	const unknownColumns = this.get('unknownColumns');
  	return this.isColumnNameInList(unknownColumns);
  }),

  isColumnNameInList: function(list){
  	const columnName = this.get('columnName');
  	const indexInList = 
  		Ember.$.inArray(columnName, list);
  	return indexInList > -1;
  },


});