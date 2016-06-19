import Ember from 'ember';

const {
  computed,
  isBlank
} = Ember;

export default Ember.Component.extend({
  // config
  maxNumberOfSlices: 8,
  minSlicePercent: 2,
  maxRadius: 250,
  labelWidthMultiplier: 0.25,
  selectedSeedColor: 'rgb(143,199,62)',

  // data
  chartData: computed('labels', 'values', function() {
    let { labels, values } = this.getProperties('labels', 'values');
    if (isBlank(labels) || isBlank(values)) {
      return [];
    }

    return labels.map(label => ({
      label: label.capitalize(),
      value: values[label],
      type: 'number'
    }));
  })
});
