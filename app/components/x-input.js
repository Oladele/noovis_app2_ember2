import Ember from 'ember';

export default Ember.TextField.extend({
  attributeBindings: ['data-test-selector']
});
