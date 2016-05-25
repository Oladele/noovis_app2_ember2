import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  tableColumn(columnName) {
    let column = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: columnName,
      getCellContent(row) {
        return row.get(columnName);
      }
    });
    return column;
  },

  tableColumns: computed('headers', function() {
    let headers = this.get('headers');
    let columns = headers.map(header => this.tableColumn(header));
    return columns;
  })
});
