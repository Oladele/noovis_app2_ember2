import Ember from 'ember';

const {
  isBlank
} = Ember;

export default Ember.Component.extend({
  actions: {
    submit() {
      const name = this.get('name');
      if (!isBlank(name)) {
        this['on-submit'](name)
          .catch(({ errors }) => this.set('errors', errors));
      }
    },

    delete() {
      this['on-delete']().catch(({errors}) => this.set('errors', errors));
    }
  }
});
