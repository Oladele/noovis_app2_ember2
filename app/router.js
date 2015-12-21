import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sites', function() {
    this.route('companies', function() {
      this.route('company', { path: ':id' });
    });
  });
});

export default Router;
