import Ember from 'ember';
import {getData} from './data-TEMP';

export default Ember.Component.extend({

	// ---------
  // Default Settings
  // ---------
  activeLabel: "Active",  //passed to component
  otherLabel: "Spare",    //passed to component

  betweenGroupPadding: 1,
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
    return getData({
      active: this.get('activeLabel'), 
      other: this.get('otherLabel')
    });  
  }),
});


