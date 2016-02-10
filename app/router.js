import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sites', function() {
    this.route('companies', function() {
      this.route('company', { path: ':id' }, function() {
        this.route('network-sites', function() {
          this.route('new');
        });
        this.route('edit');
      });
      this.route('new');
    });

    this.route('network-sites', function() {
      this.route('network-site', { path: ':id' }, function() {
        this.route('edit');
        this.route('buildings', function() {
          this.route('new');
        });
      });
    });

    this.route('buildings', function() {
      this.route('edit', { path: '/:building_id' });
    });
  });
});

export default Router;
