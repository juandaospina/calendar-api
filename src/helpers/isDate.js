const moment = require('moment');

function isDate(value) {
  if (!value) {
    return false;
  }

  const _date = moment(value);
  if (_date.isValid()) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  isDate
}