import Ember from 'ember';

const {
  inject,
  RSVP: { hash }
} = Ember;

export default Ember.Route.extend({
  ajax: inject.service(),
  model() {
    let { id } = this.modelFor('sites.network-sites.network-site');
    let ajax = this.get('ajax');
    let networkElementCounts = ajax.request(`network-sites/${id}/network-element-counts`);
    let chartPonUsageSite = ajax.request(`network-sites/${id}/chart-pon-usage-site`);
    let chartPonUsageBuildings = ajax.request(`network-sites/${id}/chart-pon-usage-buildings`);
    let chartDistributionPortsSite = ajax.request(`network-sites/${id}/chart-distribution-ports-site`);
    let chartDistributionPortsBuildings = ajax.request(`network-sites/${id}/chart-distribution-ports-buildings`);
    let chartFeederCapacitySite = ajax.request(`network-sites/${id}/chart-feeder-capacity-site`);
    let chartFeederCapacityBuildings = ajax.request(`network-sites/${id}/chart-feeder-capacity-buildings`);

    return hash({
      networkElementCounts,
      chartPonUsageSite,
      chartPonUsageBuildings,
      chartDistributionPortsSite,
      chartDistributionPortsBuildings,
      chartFeederCapacitySite,
      chartFeederCapacityBuildings
    });
  },
});
