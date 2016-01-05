import Ember from 'ember';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  Ember.LinkComponent.reopen({
    attributeBindings: ['data-test-selector']
  });
}

export default {
  name: 'data-attributes',
  initialize
};
