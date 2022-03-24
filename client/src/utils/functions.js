const isValidEmail = require('is-valid-email');
const isPhone = require('is-phone');
const isValidUsername = require('is-valid-username');

function isEmailTelOrUserName(value) {
  if (isValidEmail(value)) return 'email';
  if (isPhone(value)) return 'tel';
  if(isValidUsername(value)) return 'username';
  return 'error';
}

function getEsDate(date, ret = "fulldate") {
  date = new Date(date);

  // let day = date.getDate().length === 1 ? '0' + date.getDate() : date.getDate();
  let day = date.getDate();
  let month = date.getMonth(),
    year = date.getFullYear(),
    options = { year: "numeric", month: "long", day: "numeric" },
    splitDate = new Date(year, month, day),
    esDate = splitDate.toLocaleDateString("es-ES", options);

  // console.log(esDate)

  esDate = esDate.replaceAll(" de ", " - ");

  let esTime = date.toLocaleTimeString("es-CO");

  if (ret == "onlydate") date = esDate;
  else date = esDate + " " + esTime;

  date = date.toString();

  if (ret == "onlydate") {
    if (date.indexOf("p.") > -1) date = date.slice(0, -9) + " PM";
    if (date.indexOf("a.") > -1) date = date.slice(0, -9) + " AM";
  }

  // console.log(date)

  return date;
}

export { isEmailTelOrUserName, getEsDate };
