import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'noovis-app2-ember2/tests/helpers/ember-simple-auth';

let company;
let site;
let building;
let workbook;

moduleForAcceptance('Acceptance | sheet upload', {
  beforeEach() {
    authenticateSession(this.application);
    company = server.create('company', { name: 'ACME' });
    site = company.createNetworkSite();
    building = site.createBuilding();
    workbook = server.create('workbook', { name: 'book 1' });
  }
});

test('should show list of previous uploads', function(assert) {
  let sheet = workbook.createSheet({
    name: 'sheet 1',
    buildingId: building.id,
    updatedAt: new Date(),
    recordCount: 5
  });

  visit(`sites/buildings/${building.id}/crl-uploads`);

  andThen(() => {
    assert.equal(
      find('[data-test-selector=sheet-item]').length, 
      1, 
      'found 1 sheet'
    );

    let [bookName, sheetName, records] = find('td').toArray().mapBy('innerText');

    assert.equal(bookName, workbook.name, 'shows correct workbook name');
    assert.equal(sheetName, sheet.name, 'shows correct sheet name');
    assert.equal(records, sheet.recordCount, 'shows correct record count');
  });
});
