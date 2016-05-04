import Ember from 'ember';

export default Ember.Component.extend({
  buildingJobStatus: Ember.inject.service(),
  interval: 10000,
  schedule: function(f) {
    return Ember.run.later(this, function() {
      f.apply(this);
      this.set('timer', this.schedule(f));
    }, this.get('interval'));
  },

  didInsertElement() {
    this.set('timer', this.schedule(this.get('onPoll')));
    this.get('buildingJobStatus').registerPoll(() => {
      debugger;
      this.get('onPoll')
    });
  },

  willDestroyElement() {
    Ember.run.cancel(this.get('timer'));
    this.get('buildingJobStatus').clearPoll();
  },

  onPoll: function(){
    this.get('building').reload();
  }
});
