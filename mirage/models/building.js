import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  networkSite: belongsTo(),
  sheets: hasMany()
});
