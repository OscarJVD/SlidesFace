const isValidEmail = require('is-valid-email');
const isPhone = require('is-phone');
const isValidUsername = require('is-valid-username');

function isEmailTelOrUserName(value) {
  if (isValidEmail(value)) return 'email';
  if (isPhone(value)) return 'tel';
  if(isValidUsername(value)) return 'username';
  const userRegex = new RegExp("^[a-zA-Z0-9]+$");
  if(!userRegex.test(value)) return 'usernameerror';
  return 'error';
}

function getRandomNum(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

module.exports = { isEmailTelOrUserName, getRandomNum };
