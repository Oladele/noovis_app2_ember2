import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const {
  computed,
  inject
} = Ember;

export default Ember.Controller.extend({
  settings: storageFor('settings'),
  showWelcomeModal: computed.alias('settings.showWelcomeModal'),
  applicationController: inject.controller('application'),
  showMap: computed('applicationController.currentPath', function() {
    return this.get('applicationController.currentPath') === 'sites.index';
  }),
  activeRoute: inject.service(),

  actions: {
    toggleModal() {
      this.set('showWelcomeModal', false);
    }
  }
});
