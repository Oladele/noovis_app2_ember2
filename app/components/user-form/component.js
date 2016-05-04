import Ember from 'ember';
import { emailRule, passwordRule, passwordConfirmationRule } from '../../utils/user-validations';
import { buildValidations } from 'ember-cp-validations';

const {
  getProperties
} = Ember;

const Validations = buildValidations({
  'email': emailRule,
  'password': passwordRule,
  'passwordConfirmation': passwordConfirmationRule
});

export default Ember.Component.extend(Validations, {
  roles: ['admin', 'user', 'customer'],

  actions: {
    submit() {
      let attrs = getProperties(this, 'email', 'company', 'role', 'password', 'passwordConfirmation');
      this.get('onSubmit')(attrs);
    }
  }
});
