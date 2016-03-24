import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  building: belongsTo(),
  cableRuns: hasMany(),
  workbook: belongsTo()
});
