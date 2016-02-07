import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
// import {randomNumber, randomDate} from '../utils/random';

export default Ember.Controller.extend({

  columnNames: Ember.computed(function() {
    return [
      {
        source: "open",
        target: "Open"
      },
      {
        source: "high",
        target: "High"
      },
      {
        source: "low",
        target: "Low",
      },
      {
        source: "close",
        target: "Close"
      }
    ];
  }),

  tableColumns: Ember.computed('columnNames',function() {
    const columnNames = this.get("columnNames");
    const columnDefinitions = [];
    
    columnNames.forEach(function(columnName){
      const column = ColumnDefinition.create({
        savedWidth: 100,
        headerCellName: columnName.target,
        getCellContent: function(row) {
          return row.get(columnName.source);
        }
      });
      columnDefinitions.pushObject(column)
    });

    return(columnDefinitions);
  }),

  tableContent: Ember.computed(function() {
    var content = [];
    for (var i = 0; i < 100; i++) {
      content.pushObject({
        open:  55,
        high:  60,
        low:  70,
        close:  80,
      });
    }
    return content;
  })
});