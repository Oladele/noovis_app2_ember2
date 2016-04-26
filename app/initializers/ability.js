export function initialize(application) {
  application.inject('ability', 'sessionAccount', 'service:session-account');
}

export default {
  name: 'ability',
  initialize
};
