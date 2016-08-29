import Ember from 'ember';

export function xId(params/*, hash*/) {
  return params.join('-');
}

export default Ember.Helper.helper(xId);
