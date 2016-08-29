import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submit() {
      let cableRun = this.get('cableRun');
      this.get('onSubmit')(cableRun);
    },
    cancel() {
      this.get('onCancel')();
    }
  }
});
