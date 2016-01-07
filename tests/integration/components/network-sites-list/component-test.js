import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../../helpers/mirage-for-integration';

// Info on router setup in integration tests
// https://github.com/rwjblue/ember-qunit/issues/52
moduleForComponent('network-sites-list', 'Integration | Component | network sites list', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL

  this.render(hbs`{{network-sites-list}}`);

  assert.equal(this.$('h2').text().trim(), 'Network Sites');

  // Template block usage:" + EOL +
  // this.render(hbs`
    // {{#network-sites-list}}
      // template block text
    // {{/network-sites-list}}
  // `);

  // assert.equal(this.$().text().trim(), 'template block text');
});

test("it shows a company's network sites", function(assert) {
  const company = server.create('company', { name: 'ACME' });
  const networkSites = server.createList(
    'network-site',
     3,
     { company_id: company.id }
  );

  company.networkSites = networkSites;
  this.set('company', company);

  this.render(hbs`{{network-sites-list sites=company.networkSites}}`);

  assert.equal(
    this.$('[data-test-selector="network-site-item"]').length,
    company.networkSites.length,
    'rendered correct number of sites'
  );
});
