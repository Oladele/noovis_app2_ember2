import Ember from 'ember';

const {
  computed,
} = Ember;

export default Ember.Component.extend({
  exactMatch(cellValue, searchText) {
    return searchText ? cellValue === searchText : true;
  },

  columns: computed('headers', function() {
    let headers = this.get('headers');
    let filterFunction = this.exactMatch;
    let editColumn = {
      propertyName: '',
      title: 'Edit',
      template: 'tables/cell-edit-run'
    };
    let results = [editColumn];
    let rest = headers.map(header => ({
      filterFunction,
      filterWithSelect: false,
      propertyName: header,
      title: header
    }));
    return results.concat(rest);
  }),

  actions: {
    selectRow(id) {
      this.set('selectedId', id);
      this.get('onSelect')(id);
    }
  }
});
