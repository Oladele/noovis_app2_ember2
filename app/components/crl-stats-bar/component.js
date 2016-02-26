import Ember from 'ember';
import {getData, getFloorsData} from './data-TEMP';

export default Ember.Component.extend({

	// ---------
  // Default Settings
  // ---------
  activeLabel: "Active",  //passed to component
  otherLabel: "Spare",    //passed to component
  useFloorsData: false, //use building floors data and ignores custom labels

  betweenGroupPadding: 0.8,
  withinGroupPadding: 0,
  maxLabelHeight: 40,
  stackBars: true,
  hasXAxisTitle: false,
  hasYAxisTitle: false,
  xValueDisplayName: 'X Axis',
  yValueDisplayName: 'Y Axis',

  // ---------
  // Data
  // ---------

  data: Ember.computed(function() {
    let buildingAndOrFloorsData;
    
    if (this.get('useFloorsData')) {
      
      buildingAndOrFloorsData = getFloorsData();
    
    } else {
      
      buildingAndOrFloorsData = getData({
        active: this.get('activeLabel'), 
        other: this.get('otherLabel')
      });

    }

    return buildingAndOrFloorsData;
  }),
});


