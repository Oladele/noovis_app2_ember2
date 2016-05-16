import { validator } from 'ember-cp-validations';

export const emailRule = [
  validator('presence', true),
  validator('format', { type: 'email' })
];

export const passwordRule = [
  validator('presence', true),
  validator('length', { min: 8, max: 24 })
];

export const passwordConfirmationRule = [
  validator('presence', true),
  validator('confirmation', {
    on: 'password',
    message: '{description} do not match',
    description: 'Passwords'
  })
];

export default {
  emailRule, passwordRule, passwordConfirmationRule
};
