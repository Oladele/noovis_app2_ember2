import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  serialize(snapshot, options) {
    let json = this._super(...arguments);
    json.data.attributes['ont-ge-1-device'] = json.data.attributes['ont-ge1-device'];
    json.data.attributes['ont-ge-2-device'] = json.data.attributes['ont-ge2-device'];
    json.data.attributes['ont-ge-3-device'] = json.data.attributes['ont-ge3-device'];
    json.data.attributes['ont-ge-4-device'] = json.data.attributes['ont-ge4-device'];
    json.data.attributes['ont-ge-1-mac'] = json.data.attributes['ont-ge1-mac'];
    json.data.attributes['ont-ge-2-mac'] = json.data.attributes['ont-ge2-mac'];
    json.data.attributes['ont-ge-3-mac'] = json.data.attributes['ont-ge3-mac'];
    json.data.attributes['ont-ge-4-mac'] = json.data.attributes['ont-ge4-mac'];

    delete json.data.attributes['ont-ge1-device'];
    delete json.data.attributes['ont-ge2-device'];
    delete json.data.attributes['ont-ge3-device'];
    delete json.data.attributes['ont-ge4-device'];
    delete json.data.attributes['ont-ge1-mac'];
    delete json.data.attributes['ont-ge2-mac'];
    delete json.data.attributes['ont-ge3-mac'];
    delete json.data.attributes['ont-ge4-mac'];

    return json;
  }
});
