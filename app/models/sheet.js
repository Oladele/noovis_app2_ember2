import DS from 'ember-data';
import Ember from 'ember';

const {
  computed
} = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  building: DS.belongsTo('building'),
  cableRuns: DS.hasMany('cableRun'),
  updatedAt: DS.attr('date'),
  recordCount: DS.attr(),
  workbook: DS.belongsTo('workbook'),
  versions: DS.attr(),
  updatedDate: computed('updatedAt', function() {
    let date = this.get('updatedAt');
    let options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleTimeString('en-us', options);
  }) 
});
