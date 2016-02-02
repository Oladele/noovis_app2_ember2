import Ember from 'ember';

const {
  computed,
  inject
} = Ember;

export default Ember.Controller.extend({
  applicationController: inject.controller('application'),
  showMap: computed('applicationController.currentPath', function() {
    return this.get('applicationController.currentPath') === 'sites.index';
  })
});
