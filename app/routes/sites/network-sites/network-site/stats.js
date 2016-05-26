import Ember from 'ember';

const {
  RSVP: { hash }
} = Ember;

export default Ember.Route.extend({
  model(params) {
    let { id } = this.modelFor('sites.network-sites.network-site');
    let networkElementCount = this.store.queryRecord('networkElementCount', {
      networkId: id }
    );
    let ponUseSite = this.store.queryRecord('ponUseSite', {
      networkId: id
    });
    let ponUseBuilding = this.store.queryRecord('ponUseBuilding', {
      networkId: id
    });
    let feederCapacitySite = this.store.queryRecord('feederCapacitySite', {
      networkId: id
    });
    let feederCapacityBuilding = this.store.queryRecord('feederCapacityBuilding', {
      networkId: id
    });

    return hash({
      networkElementCount,
      ponUseSite,
      ponUseBuilding,
      feederCapacitySite,
      feederCapacityBuilding
    });
  }
});
