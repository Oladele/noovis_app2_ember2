import Ember from 'ember';
// import {asset_values, pon_utilization} from './data-TEMP';
import {getData} from './data-TEMP';

export default Ember.Component.extend({

	// ---------
  // Default Settings
  // ---------
  activeLabel: "Active",  //passed to component
  otherLabel: "Spare",    //passed to component

  maxNumberOfSlices: 8,
  minSlicePercent: 2,
  maxRadius: 250,
  labelWidthMultiplier: 0.25,
  selectedSeedColor: "rgb(0, 0, 65)",

  // ---------
  // Data
  // ---------

  data: Ember.computed(function() {
    return getData({
      active: this.get('activeLabel'), 
      other: this.get('otherLabel')
    });
  }),


});
