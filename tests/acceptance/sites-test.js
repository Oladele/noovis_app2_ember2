import { test } from 'qunit';
import moduleForAcceptance from 'noovis-app2-ember2/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sites');

test('visiting /sites', function(assert) {
  var company = server.create('company', {name: "ACME"});
  server.create('network-site', {
     name: "ACME Lab",
     company: company.id
  });
	
	server.createList('network-site', 3, {company: company.id});
  visit('/sites');

  andThen(function() {
    assert.equal(currentURL(), '/sites');

    assert.equal(
    	find('[data-role=company-link]').length, 
    	1,
    	"All company links are rendered");

    assert.equal(
    	find('[data-role=company-link]:first').text(),
    	"ACME", 
    	"Company links contain the company name");
    
    assert.equal(
    	find('[data-role=network-site-link]').length, 
    	4,
    	"All network site links are rendered");
    
    assert.equal(
    	find('[data-role=network-site-link]:first').text(),
    	"ACME Lab", 
    	"Network site links contain the network-site name");
  });
});


test('Sites page company links', function(assert) {
	var company = server.create('company', {name: "ACME"});
  // server.create('network-site', {
  //    name: "ACME Lab",
  //    company: company.id
  // });

  visit('/sites');
  click('[data-role=company-link]:first');

  andThen(function() {
    assert.equal(currentURL(), '/sites/companies/'+ company.id);
    assert.equal(
      find('[data-role=company-title]:first').text(),
      "ACME", 
      "Company title is on show company page");
  });
});

test('Sites page network-site links', function(assert) {
  var company = server.create('company', {name: "ACME"});
  var networkSite = server.create('network-site', {
     name: "ACME Lab",
     company: company.id
  });

  visit('/sites');
  click('[data-role=network-site-link]:first');

  andThen(function() {
    assert.equal(currentURL(), '/sites/network-sites/'+ networkSite.id);
    assert.equal(
      find('[data-role=network-site-title]:first').text(),
      "ACME Lab", 
      "Network Site title is on show network-site page");
  });
});