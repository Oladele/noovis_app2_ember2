import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr(),
  building: DS.attr(),
  room: DS.attr(),
  drop: DS.attr(),
  rdt: DS.attr(),
  rdtPort: DS.attr(),
  fdhPort: DS.attr(),
  splitter: DS.attr(),
  splitterFiber: DS.attr(),
  ponCard: DS.attr(),
  ponPort: DS.attr(),
  fdh: DS.attr(),
  notes: DS.attr(),
  oltRack: DS.attr(),
  oltChassis: DS.attr(),
  vamShelf: DS.attr(),
  vamModule: DS.attr(),
  vamPort: DS.attr(),
  backboneShelf: DS.attr(),
  backboneCable: DS.attr(),
  backbonePort: DS.attr(),
  fdhLocation: DS.attr(),
  rdtLocation: DS.attr(),
  ontMmodel: DS.attr(),
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
  sheet: DS.belongsTo('sheet')
});
