import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.belongsTo('company'),
  name: DS.attr('string'),
  address: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number')
});
