import Ember from 'ember';

const {
  isBlank
} = Ember;

export default Ember.Component.extend({
  showEditControls: false,

  didReceiveAttrs() {
    const route = this.get('routeName');
    const isEditRoute = route !== 'new';
    this.set('showEditControls', isEditRoute);
  },

  actions: {
    submit() {
      const name = this.get('name');
      if (!isBlank(name)) {
        this['on-submit'](name);
      }
    },

    delete() {
      this['on-delete']();
    }
  }
});
