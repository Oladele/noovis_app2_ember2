import Ember from 'ember';
import Table from 'ember-light-table';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns'), this.get('tableContent')));
  },

  columns: computed('headers', function() {
    let headers = this.get('headers');
    return headers.map(header => {
      return {
        label: header,
        valuePath: header
      };
    });
  })
});
