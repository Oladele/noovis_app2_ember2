import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  site(i) { return `Site ${i+1}`; }
});
