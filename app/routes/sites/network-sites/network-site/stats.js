import Ember from 'ember';

const {
  inject,
  RSVP: { hash }
} = Ember;

export default Ember.Route.extend({
  ajax: inject.service(),
  model() {
    let { id } = this.modelFor('sites.network-sites.network-site');
    let networkElementCount = this.store.queryRecord('networkElementCount', {
      networkId: id }
    );

    let ajax = this.get('ajax');
    let chartPonUsageSite = ajax.request(`network-sites/${id}/chart-pon-usage-site`);
    let chartPonUsageBuildings = ajax.request(`network-sites/${id}/chart-pon-usage-buildings`);
    let chartDistributionPortsSite = ajax.request(`network-sites/${id}/chart-distribution-ports-site`);
    let chartDistributionPortsBuildings = ajax.request(`network-sites/${id}/chart-distribution-ports-buildings`);
    let chartFeederCapacitySite = ajax.request(`network-sites/${id}/chart-feeder-capacity-site`);
    let chartFeederCapacityBuildings = ajax.request(`network-sites/${id}/chart-feeder-capacity-buildings`);

    return hash({
      networkElementCount,
      chartPonUsageSite,
      chartPonUsageBuildings,
      chartDistributionPortsSite,
      chartDistributionPortsBuildings,
      chartFeederCapacitySite,
      chartFeederCapacityBuildings
    });
  }
});
