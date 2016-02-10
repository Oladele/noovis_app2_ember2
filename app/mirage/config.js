export default function() {

  this.del('/network-sites/:id', function(db, request) {
    var id = request.params.id;
    db['network-sites'].remove(id);

    // fix for mirage test error:
    // Assertion Failed: normalizeResponse must return a valid JSON API document
    // One or more of the following keys must be present: "data", "errors", "meta".
    return { "meta": {"deleted":"deleted"}};
  });

  this.get('/network-sites', function(db, request) {
    var company = request.queryParams.company;
    var dbData;

    if (company) {
      dbData = db['network-sites'].where({company: company});
    } else{
      dbData = db['network-sites'];
    }

    var data = dbData.map(attrs => (
      {
        "type": 'network-sites',
        "id": attrs.id,
        "attributes": attrs,
        "relationships": {
          "company": {
            "links": {
              "self": `/network-sites/${attrs.id}/relationships/company`,
              "related": `/network-sites/${attrs.id}/company`
            }
          }
        }
      }
    ));

    return {
      data: data,
    };
  });

  this.get('/companies/:id/network-sites', function(db, request) {
    var id = request.params.id;
    var networkSites = db["network-sites"].where({company: id});

    return {
      data: networkSites.map(attrs => (
        {
          type: 'network-sites',
          id: attrs.id,
          attributes: attrs,
          relationships: {
            company: {
              links: {
                self: `/network-sites/${attrs.company_id}/relationships/company`,
                related: `/network-sites/${attrs.company_id}/company`
              }
            }
          }
        }
      ))
    };
  });

  this.post('/network-sites', function(db, request) {
    var requestBody = JSON.parse(request.requestBody);
    var attrs = requestBody.data.attributes;
    var rels = requestBody.data.relationships;
    var companyId = rels.company.data.id;

    attrs.company = companyId;
    var networkSite = db["network-sites"].insert(attrs);

    var response = {
      data:{
        id: networkSite.id,
        type: "network-sites",
        attributes: networkSite
      }
    };

    return response;
  });

  this.get('/network-sites/:id', function(db, request) {

    var id = request.params.id;
    var networkSite = db["network-sites"].find(id);
    var data = {
      "type": 'network-sites',
      "id": networkSite.id,
      "attributes": networkSite,
      "relationships": {
        "company": {
          "data": {
            "type": "companies",
            "id": networkSite.company
          }
        },
        "buildings": {
          "links": {
            "self": `/network-sites/${id}/relationships/buildings`,
            "related": `/network-sites/${id}/buildings`
          },
          "data": db["buildings"].where({networkSite: id}).map(attrs =>(
              {
                "type": "buildings",
                "id": attrs.id
              }
            ))
        }
      }
    };

    var included = db["buildings"].where({networkSite: id}).map(attrs =>(
      {
        "id": attrs.id,
        "type": "buildings",
        "attributes": attrs,
        "relationships": {
          "network-site": {
            "links": {
              "self": `/buildings/${attrs.id}/relationships/network-site`,
              "related": `/buildings/${attrs.id}/network-site`
            }
          }
        }
      }
    ));

    // let included = [
      // {
        // type: 'companies',
        // id: networkSite.company
      // }
    // ];

    included.push({
        type: 'companies',
        id: networkSite.company
      }
    );

    return {
      data: data,
      included: included
    };
  });

  this.patch('/network-sites/:id', function(db, request) {
    var requestBody = JSON.parse(request.requestBody);
    var attrs = requestBody.data.attributes;
    var id = request.params.id;
    var networkSite = db["network-sites"].update(id, attrs);
    var response = {
      data:{
        id: networkSite.id,
        type: "network-sites",
        attributes: networkSite
      }
    };
    return response;
  });

  // this.get('/companies');
  this.get('/companies', function(db) {

    var data = db.companies.map(attrs => (
      {
        "type": 'companies',
        "id": attrs.id,
        "attributes": attrs,
        "relationships": {
          "network-sites": {
            "links": {
              "self": `/companies/${attrs.id}/relationships/network-sites`,
              "related": `/companies/${attrs.id}/network-sites`
            },
            "data": db["network-sites"].where({company: attrs.id}).map(attrs =>(
                {
                  "type": "network-sites",
                  "id": attrs.id
                }
              ))
          }
        }
      }
    ));

    var included = db["network-sites"].map(attrs =>(
      {
        "id": attrs.id,
        "type": "network-sites",
        "attributes": {
          "name": attrs.name,
          "description": attrs.description,
          "portsActive": attrs.portsActive,
          "portsTotal": attrs.portsTotal,
          "portsActivePercent": attrs.portsActivePercent
        },
        "relationships": {
          "company": {
            "links": {
              "self": `/network-sites/${attrs.id}/relationships/company`,
              "related": `/network-sites/${attrs.id}/company`
            }
          }
        }
      }
    ));

    window.tempData = data;

    return {
      data: data,
      included: included
    };
  });

  this.post('/companies', function(db, request) {
    var requestBody = JSON.parse(request.requestBody);
    var attrs = requestBody.data.attributes;
    var company = db.companies.insert(attrs);
    var response = {
      data:{
        id: company.id,
        type: "companies",
        attributes: company
      }
    };
    return response;
  });

  this.patch('/companies/:id', function(db, request) {
    var requestBody = JSON.parse(request.requestBody);
    var attrs = requestBody.data.attributes;
    var id = request.params.id;
    var company = db.companies.update(id, attrs);
    var response = {
      data:{
        id: company.id,
        type: "companies",
        attributes: company
      }
    };
    return response;
  });

  this.get('/companies/:id', function(db, request) {

    var id = request.params.id;
    var company = db.companies.find(id);
    var response = {
      data:{
        id: company.id,
        type: "companies",
        attributes: company
      }
    };
    return response;
  });

  // this.del('/companies/:id');
  this.del('/companies/:id', function(db, request) {
    var id = request.params.id;
    db.companies.remove(id);

    // fix for mirage test error:
    // Assertion Failed: normalizeResponse must return a valid JSON API document
    // One or more of the following keys must be present: "data", "errors", "meta".
    return { "meta": {"deleted":"deleted"}};
  });

  this.post('/buildings', function(db, request) {
    let requestBody = JSON.parse(request.requestBody);
    let data = requestBody.data.attributes;
    let building = db.buildings.insert(data);
    let response = {
      data: {
        id: building.id,
        type: 'buildings',
        attributes: building
      }
    };

    return response;
  });

  this.get('/buildings/:id', function(db, request) {
    let id = request.params.id;

    let response = {
      data: {
        id: id,
        type: 'buildings',
        attributes: db.buildings.find(id)
      }
    };

    return response;
  });

  this.patch('/buildings/:id', function(db, request) {
    let id = request.params.id;
    let attrs = JSON.parse(request.requestBody);
    db.buildings.update(id, attrs.data.attributes);

    let response = {
      data: {
        type: 'buildings',
        id: id,
        attributes: db.buildings.find(id)
      }
    };

    return response;
  });

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
