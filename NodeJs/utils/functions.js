const isValidEmail = require('is-valid-email');
const isPhone = require('is-phone');
const isValidUsername = require('is-valid-username');
const mongoose = require('mongoose');

const getMyCollections = mongoose => new Promise((resolve, reject) => {
  try {
    mongoose.connection.db.listCollections().toArray().then(collections => {
      const names = collections.map(col => col.name);
      resolve(names);
    })
    
  } catch (error) {
    console.log(error)
    console.log(util.inspect(error))
  }
});

function isEmailTelOrUserName(value) {
  if (isValidEmail(value)) return 'email';
  if (isPhone(value)) return 'tel';
  if (isValidUsername(value)) return 'username';
  const userRegex = new RegExp("^[a-zA-Z0-9]+$");
  if (!userRegex.test(value)) return 'usernameerror';
  return 'error';
}

function getRandomNum(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function sort(object) {
  // Don't try to sort things that aren't objects
  if (typeof object != "object") {
    return object;
  }

  // Don't sort arrays, but do sort their contents
  if (Array.isArray(object)) {
    object.forEach(function (entry, index) {
      object[index] = sort(entry);
    });
    return object;
  }

  console.log(object)
  // Sort the keys
  let newObject = {};
  if(object){
    let keys = Object.keys(object);
    keys.sort(function (a, b) {
      let atype = typeof object[a],
        btype = typeof object[b],
        rv;
      if (atype !== btype && (atype === "object" || btype === "object")) {
        // Non-objects before objects
        rv = atype === 'object' ? 1 : -1;
      } else {
        // Alphabetical within categories
        rv = a.localeCompare(b);
      }
      return rv;
    });
    
    // Create new object in the new order, sorting
    // its subordinate properties as necessary
    keys.forEach(function (key) {
      newObject[key] = sort(object[key]);
    });
  }
  return newObject;
}

module.exports = { isEmailTelOrUserName, getRandomNum, sort, getMyCollections };
