import DS from 'ember-data';

export default DS.Model.extend({
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  networkSite: DS.belongsTo('network-site'),
  sheets: DS.hasMany('sheet'),
  nodeCounts: DS.attr(),
  importJobStatus: DS.attr('string'),
  importJobMessage: DS.attr('string')
});
