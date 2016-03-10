import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  building: DS.belongsTo('building'),
  cableRuns: DS.hasMany('cableRun')
});
