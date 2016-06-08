import Ember from 'ember';

const {
  RSVP: { hash }
} = Ember;

export default Ember.Route.extend({
  model(params) {
    return hash({
      cableRun: this.store.findRecord('cableRun', params.cableRun_id)
    });
  },

  deactivate() {
    this._super(...arguments);
    this.discardUnsavedChanges();
  },

  discardUnsavedChanges() {
    let model = this.modelFor('sites.cableRuns.edit');
    model.cableRun.rollbackAttributes();
  },

  actions: {
    updateCableRun(cableRun) {
      let flashMessages = this.get('flashMessages');
      cableRun.save()
        .then(() => {
          let model = this.modelFor('sites.cableRuns.edit');
          let buildingId = model.cableRun.get('buildingLink.id');
          this.transitionTo('sites.buildings.edit.network', buildingId);
          flashMessages.success('Cable run was updated.');
        })
        .catch(({ errors }) => {
          let messages = errors.map(error => error.detail);
          flashMessages.danger(messages.join(' '));
        });
    },
    didCancel() {
      let model = this.modelFor('sites.cableRuns.edit');
      let buildingId = model.cableRun.get('buildingLink.id');
      this.transitionTo('sites.buildings.edit.network', buildingId);
    }
  }
});
