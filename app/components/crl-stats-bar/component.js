import Ember from 'ember';
import five_ranges from './data-TEMP';

export default Ember.Component.extend({

	// ---------
  // Default Settings
  // ---------
  betweenGroupPadding: 1,
  withinGroupPadding: 0,
  maxLabelHeight: 40,
  stackBars: true,
  hasXAxisTitle: false,
  hasYAxisTitle: false,
  xValueDisplayName: 'X Axis',
  yValueDisplayName: 'Y Axis',

  data: Ember.computed('selectedData', 'rawDataHash', function() {
    return this.get('rawDataHash')[this.get('selectedData')];
  }),
  rawDataHash: Ember.computed(function() {
    return {
      five_ranges: five_ranges,
    };
  }),
  selectedData: 'five_ranges'

});
