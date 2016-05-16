import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  buildingJobStatus: Ember.inject.service(),

  interval: computed(function() {
    return !Ember.testing ? 10000 : 0;
  }),

  schedule(f) {
    if (!Ember.testing) {
      return Ember.run.later(this, function() {
        f.apply(this);
        this.set('timer', this.schedule(f));
      }, this.get('interval'));
    }
  },

  didInsertElement() {
    this.set('timer', this.schedule(this.get('onPoll')));
    this.get('buildingJobStatus').registerPoll(() => {
      this.get('onPoll');
    });
  },

  willDestroyElement() {
    Ember.run.cancel(this.get('timer'));
    this.get('buildingJobStatus').clearPoll();
  },

  onPoll() {
    this.get('building').reload();
  },

  // ember-concurrency
  // getJobStatus: task(function * () {
    // let interval = this.get('interval');
    // while (true) {
      // this.get('building').reload();
      // yield timeout(interval);
    // }
  // }).on('init').cancelOn('deactivate')
});
