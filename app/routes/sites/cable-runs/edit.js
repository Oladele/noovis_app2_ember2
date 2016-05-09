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

  actions: {
    updateCableRun(cableRun) {
      let flashMessages = this.get('flashMessages');
      cableRun.save()
        .then(() => flashMessages.success('Cable run was updated.'))
        .catch(({ errors }) => flashMessages.danger(errors.join('. ')));
    }
  }
});
