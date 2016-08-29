import Ember from 'ember';

export default Ember.Service.extend({
  pollFn: null,

  checkNow() {
    const fn = this.get('pollFn');
    if(fn) {
      fn();
    }
  },

  registerPoll(fn) {
    this.set('pollFn', fn);
  },

  clearPoll() {
    this.set('pollFn', null);
  }
});
