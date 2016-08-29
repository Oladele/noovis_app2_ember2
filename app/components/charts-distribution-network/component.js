import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  labels: computed('siteStats', function() {
    let stats = this.get('siteStats');
    return Object.keys(stats);
  }),
});
