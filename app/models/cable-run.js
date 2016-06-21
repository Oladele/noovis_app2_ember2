import DS from 'ember-data';
import Ember from 'ember';

const {
  computed
} = Ember;

export default DS.Model.extend({
  site: DS.attr(),
  building: DS.attr(),
  room: DS.attr('number'),
  drop: DS.attr('number'),
  rdt: DS.attr('number'),
  rdtPort: DS.attr('number'),
  fdhPort: DS.attr('number'),
  splitter: DS.attr('number'),
  splitterFiber: DS.attr('number'),
  ponCard: DS.attr('number'),
  ponPort: DS.attr('number'),
  fdh: DS.attr(),
  notes: DS.attr(),
  oltRack: DS.attr(),
  oltChassis: DS.attr(),
  vamShelf: DS.attr('number'),
  vamModule: DS.attr('number'),
  vamPort: DS.attr('number'),
  backboneShelf: DS.attr('number'),
  backboneCable: DS.attr('number'),
  backbonePort: DS.attr('number'),
  fdhLocation: DS.attr(),
  rdtLocation: DS.attr(),
  ontModel: DS.attr(),
  ontSn: DS.attr(),
  rdtPortCount: DS.attr(),
  ontGe1Device: DS.attr(),
  ontGe1Mac: DS.attr(),
  ontGe2Device: DS.attr(),
  ontGe2Mac: DS.attr(),
  ontGe3Device: DS.attr(),
  ontGe3Mac: DS.attr(),
  ontGe4Device: DS.attr(),
  ontGe4Mac: DS.attr(),
  sheet: DS.belongsTo('sheet'),
  companyLink: computed.alias('sheet.building.networkSite.company'),
  networkSiteLink: computed.alias('sheet.building.networkSite'),
  buildingLink: computed.alias('sheet.building')
});
