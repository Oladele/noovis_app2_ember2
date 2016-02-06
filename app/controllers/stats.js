import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
// import {randomNumber, randomDate} from '../utils/random';

export default Ember.Controller.extend({
  tableColumns: Ember.computed(function() {
    var dateColumn = ColumnDefinition.create({
      savedWidth: 150,
      textAlign: 'text-align-left',
      headerCellName: 'Date',
      getCellContent: function(row) {
        return row.get('date').toDateString();
      }
    });
    var openColumn = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: 'Open',
      getCellContent: function(row) {
        return row.get('open').toFixed(2);
      }
    });
    var highColumn = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: 'High',
      getCellContent: function(row) {
        return row.get('high').toFixed(2);
      }
    });
    var lowColumn = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: 'Low',
      getCellContent: function(row) {
        return row.get('low').toFixed(2);
      }
    });
    var closeColumn = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: 'Close',
      getCellContent: function(row) {
        return row.get('close').toFixed(2);
      }
    });
    return [dateColumn, openColumn, highColumn, lowColumn, closeColumn];
  }),

  tableContent: Ember.computed(function() {
    var content = [];
    var date;
    for (var i = 0; i < 100; i++) {
      date = new Date(2012, 2, 2);
      content.pushObject({
        date: date,
        open:  50,
        high:  50,
        low:  50,
        close:  50,
        volume:  1000000
      });
    }
    return content;
  })
});