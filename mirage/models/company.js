import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  networkSites: hasMany(),
  users: hasMany(),
});
