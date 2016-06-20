import Ember from 'ember';

const {
  computed,
} = Ember;

export default Ember.Component.extend({
  classNames: ['networkSummaryTable-container'],
  columns: computed('headers', function() {
    let headers = this.get('headers');
    let editColumn = {
      propertyName: '',
      title: 'Edit',
      template: 'tables/cell-edit-run'
    };
    let results = [editColumn];
    let rest = headers.map(header => ({
      propertyName: header,
      title: header
    }));
    return results.concat(rest);
  }),

  actions: {
    selectRow(id) {
      this.get('onSelect')(id);
    }
  }
});
