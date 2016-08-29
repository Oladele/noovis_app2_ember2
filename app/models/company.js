import DS from 'ember-data';

export default DS.Model.extend({
  networkSites: DS.hasMany('network-site'),
  name: DS.attr('string'),
  nodeCounts: DS.attr(),
  users: DS.hasMany()
});
