import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name(i) { return `Building ${i+1}`; },
});