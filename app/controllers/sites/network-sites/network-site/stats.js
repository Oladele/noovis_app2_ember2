import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  queryParams: ['chart'],
  chart: 'pon-channel',
  showPonChannel: computed.equal('chart', 'pon-channel'),
  showFeederCapacity: computed.equal('chart', 'feeder-capacity'),
  showDistributionNetwork: computed.equal('chart', 'distribution-network')
});
