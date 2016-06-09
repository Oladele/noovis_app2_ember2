import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  company: belongsTo('company'),
  name: attr('string'),
  lat: attr('number'),
  lng: attr('number'),
  buildings: hasMany('building'),
  address: attr('string'),
  nodeCounts: attr()
});
