import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
	model(){
		console.log("config.environment:", config.environment);
		console.log("config.apiHost:", config.apiHost);
		return this.store.findAll('company');
	}
});
