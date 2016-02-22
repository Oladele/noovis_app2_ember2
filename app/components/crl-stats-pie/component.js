import Ember from 'ember';
import {asset_values, pon_utilization} from './data-TEMP';

export default Ember.Component.extend({

	// ---------
  // Default Settings
  // ---------

  maxNumberOfSlices: 8,
  minSlicePercent: 2,
  maxRadius: 250,
  labelWidthMultiplier: 0.25,
  selectedSeedColor: "rgb(0, 0, 65)",

  // ---------
  // Data Selection
  // ---------

  // availableDataSets: Ember.computed('rawDataHash', function() {
  //   return Ember.A(_.keys(this.get('rawDataHash')));
  // }),

  data: Ember.computed('rawDataHash', function() {
    return this.get('rawDataHash')['pon_utilization'];
  }),

  rawDataHash: Ember.computed(function() {
    return {
      asset_values: asset_values,
      pon_utilization: pon_utilization,
    };
  }),

});
