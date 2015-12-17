import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sites');

test('visiting /sites', function(assert) {
	server.createList('network-site', 3);
	server.create('network-site', {name: "ACME Lab"});
  visit('/sites');

  andThen(function() {
    assert.equal(currentURL(), '/sites');
    assert.equal(find('[data-role=network-site-name]').length, 4, "All network-site names are rendered");
    assert.equal(find('[data-role=network-site-name]:contains("ACME Lab")').length, 1, "network-site names contains the network-site name");
  });
});
