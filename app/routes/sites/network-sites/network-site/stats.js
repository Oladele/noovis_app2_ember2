import Ember from 'ember';

const {
  RSVP: { hash }
} = Ember;

export default Ember.Route.extend({
  model() {
    let { id } = this.modelFor('sites.network-sites.network-site');
    let networkElementCount = this.store.queryRecord('networkElementCount', {
      networkId: id }
    );
    let ponUsageSite = this.store.queryRecord('ponUsageSite', {
      networkId: id
    });
    let ponUsageBuilding = this.store.queryRecord('ponUsageBuilding', {
      networkId: id
    });
    let feederCapacitySite = this.store.queryRecord('feederCapacitySite', {
      networkId: id
    });
    let feederCapacityBuilding = this.store.queryRecord('feederCapacityBuilding', {
      networkId: id
    });
    let distributionSite = this.store.queryRecord('distributionSite', {
      networkId: id
    });
    let distributionBuilding = this.store.queryRecord('distributionBuilding', {
      networkId: id
    });
    let distributionFloor = this.store.queryRecord('distributionFloor', {
      networkId: id
    });

    return hash({
      networkElementCount,
      ponUsageSite,
      ponUsageBuilding,
      feederCapacitySite,
      feederCapacityBuilding,
      distributionSite,
      distributionBuilding,
      distributionFloor
    });
  }
});
