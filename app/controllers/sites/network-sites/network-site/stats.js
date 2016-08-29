import Ember from 'ember';

const {
  computed,
  isBlank
} = Ember;

export default Ember.Controller.extend({
  queryParams: ['chart'],
  chart: 'pon-channel',
  showPonChannel: computed.equal('chart', 'pon-channel'),
  showFeederCapacity: computed.equal('chart', 'feeder-capacity'),
  showDistributionNetwork: computed.equal('chart', 'distribution-network'),
  showDistributionByFloors: computed.equal('chart', 'distribution-by-floors'),

  tableHeaders: computed('model.networkElementCounts', function() {
    let counts = this.get('model.networkElementCounts');
    if (isBlank(counts)) {
      return [];
    }
    let row = counts[0];
    return Object.keys(row);
  })
});
