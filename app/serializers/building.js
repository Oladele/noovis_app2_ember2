import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  serialize(snapshot, options) {
    let json = this._super(...arguments);
    delete json.data.attributes['node-counts'];
    delete json.data.attributes['import-job-status'];
    delete json.data.attributes['import-job-message'];

    return json;
  }
});
