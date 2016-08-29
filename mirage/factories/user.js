import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  email() {
    return faker.internet.email();
  }
});

