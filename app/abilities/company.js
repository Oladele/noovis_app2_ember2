import { Ability } from 'ember-can';
import Ember from 'ember';

const {
  computed
} = Ember;

export default Ability.extend({
  canWrite: computed('sessionAccount.account', function() {
    return this.get('sessionAccount.account.isAdmin');
  })
});
