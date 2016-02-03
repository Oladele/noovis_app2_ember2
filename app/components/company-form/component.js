import Ember from 'ember';

const {
  isBlank
} = Ember;

export default Ember.Component.extend({
  actions: {
    submit() {
      const name = this.get('name');
      const company = this.get('company');
      if (!isBlank(name)) {
        this['on-submit'](company, name)
          .catch(({ errors }) => this.set('errors', errors));
      }
    },

    delete() {
      const company = this.get('company');
      this['on-delete'](company).catch(({errors}) => this.set('errors', errors));
    }
  }
});
