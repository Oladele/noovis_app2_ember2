import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('network-site-listing', 'Integration | Component | network site listing', {
  integration: true
});

test('it renders', function(assert) {
  
  var networkSite = Ember.Object.create({name: 'ACME Lab'});
  this.set('networkSite', networkSite);

  this.render(hbs`
    {{network-site-listing networkSite=networkSite}}
  `);

  assert.equal(this.$('[data-role=network-site-link]:first').text(), "ACME Lab");

});
