const isValidEmail = require('is-valid-email');
const isPhone = require('is-phone');
const isValidUsername = require('is-valid-username');

function isEmailTelOrUserName(value) {
  if (isValidEmail(value)) return 'email';
  if (isPhone(value)) return 'tel';
  if(isValidUsername(value)) return 'username';
  return 'error';
}

export { isEmailTelOrUserName };
