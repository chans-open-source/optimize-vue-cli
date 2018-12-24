const _ = require('lodash');
const isUp = c => /[A-Z]/.test(c);

const isNum = c => /[0-9]/.test(c);

const parseClassName = modulePath => {
  modulePath = fixPath(modulePath);
  return _.kebabCase(modulePath);
};

const fixPath = modulePath => {
  modulePath = modulePath.startsWith('/') ? modulePath.substr(1) : modulePath;
  modulePath = modulePath.endsWith('/') ? modulePath.substr(0, modulePath.length - 1) : modulePath;
  return modulePath;
};

module.exports = {
  isUp, isNum, parseClassName, fixPath
};
