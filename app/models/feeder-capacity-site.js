import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';

const {
  computed
} = Ember;

export default Model.extend({
  stats: attr(),
  labels: computed('stats', function() {
    let stats = this.get('stats');
    return Object.keys(stats);
  })
});
