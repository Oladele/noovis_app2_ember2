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
        this.route('stats');
      });
    });

    this.route('buildings', function() {
      this.route('edit', { path: '/:building_id' }, function() {
        this.route('map');
        this.route('network');
        this.route('crl-uploads');
      });
    });

    this.route('cable-runs', function() {
      this.route('edit', { path: '/:cableRun_id' });
    });
  });
  this.route('login');
  this.route('admin', function() {
    this.route('users', function() {
      this.route('new');
      this.route('edit', { path: ':user_id'});
    });
  });
  this.route('users', function() {
    this.route('edit');
  });
  this.route('not-found', { path: '/*wildcard' });
});

export default Router;
