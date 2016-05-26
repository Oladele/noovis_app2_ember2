import Ember from 'ember';

export default Ember.Component.extend({
  useFloorsData: false, //use building floors data and ignores custom labels
  betweenGroupPadding: 0.8,
  withinGroupPadding: 0,
  maxLabelHeight: 40,
  stackBars: true,
  hasXAxisTitle: false,
  hasYAxisTitle: false,
  xValueDisplayName: 'X Axis',
  yValueDisplayName: 'Y Axis',
});
