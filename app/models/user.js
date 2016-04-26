import Model from 'ember-data/model';
import Ember from 'ember';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const {
  computed,
  isEqual,
} = Ember;

export default Model.extend({
  email: attr(),
  role: attr(),
  company: belongsTo(),
  isAdmin: computed('role', function() {
    return isEqual(this.get('role'), 'admin');
  }),
  isUser: computed('role', function() {
    return isEqual(this.get('role'), 'user');
  }),
  isCustomer: computed('role', function() {
    return isEqual(this.get('role'), 'customer');
  }),
});
