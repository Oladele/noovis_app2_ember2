import Ember from 'ember';
import moment from 'moment';

const {
  computed,
  isEmpty
} = Ember;

export default Ember.Component.extend({
  user: computed.alias('version.user.email'),

  panelType: computed('version.event_type', function() {
    let event = this.get('version.event_type');
    let types = {
      create: 'panel-success',
      update: 'panel-info',
      delete: 'panel-danger'
    };
    return types[event];
  }),

  ontSn: computed('version.cable_run.ont_sn', function() {
    let sn = this.get('version.cable_run.ont_sn');
    return `ONT ${sn}`;
  }),

  changeType: computed('version', function() {
    let type = this.get('version.event_type');
    return `${type.toUpperCase()}D`;
  }),

  updatedAt: computed('version', function() {
    let [, recent] = this.get('version.changes.updated_at');
    return moment(recent).fromNow();
  }),

  description: computed('ontSn', 'changeType', 'updatedAt', 'user', function() {
    let {
      ontSn,
      changeType,
      updatedAt,
      user
    } = this.getProperties('ontSn', 'changeType', 'updatedAt', 'user');
    return `${ontSn} ${changeType} ${updatedAt} by ${user}:`;
  }),

  diffs: computed('version.changes', function() {
    let changes = this.get('version.changes');
    let diffs = [];
    Object.keys(changes).forEach(key => {
      let [previous, current] = changes[key];
      previous = this._initValue(previous);
      let attribute = key;
      diffs.push({ attribute, previous, current });
    });
    return diffs;
  }),

  _initValue(value) {
    return isEmpty(value) ? '-' : value;
  }
});
