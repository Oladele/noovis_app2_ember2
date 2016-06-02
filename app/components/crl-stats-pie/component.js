import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  // config
  maxNumberOfSlices: 8,
  minSlicePercent: 2,
  maxRadius: 250,
  labelWidthMultiplier: 0.25,
  selectedSeedColor: 'rgb(118,189,29)',

  // data
  chartData: computed('labels', 'values', function() {
    let { labels, values } = this.getProperties('labels', 'values');
    return labels.map(label => ({
      label: label.capitalize(),
      value: values[label],
      type: 'number'
    }));
  })
});
