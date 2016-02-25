/* global Blob */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../../helpers/mirage-for-integration';

moduleForComponent('workbook-importer', 'Integration | Component | workbook importer', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{workbook-importer}}`);

  assert.ok(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#workbook-importer}}
      template block text
    {{/workbook-importer}}
  `);

  assert.ok(this.$().text().trim(), 'template block text');
});

test('should upload workbook', function(assert) {
  assert.expect(2);
  let sheet = 'sheet1';
  this.set('file', new Blob());
  this.set('sheetName', sheet);

  let done = assert.async();
  server.post('/import_cable_run', function(db, request) {
    let data = request.requestBody;
    assert.equal(data.get('sheet'), sheet, 'sheet is correct');
    assert.ok(data.get('file'), 'file was sent');
    done();
  });

  this.render(hbs`
    {{workbook-importer
       buildingId=1
       sheetName=sheetName
       file=file
    }}
  `);

  this.$('[data-test-selector=import-workbook-button]').click();
});


