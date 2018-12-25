const chalk = require('chalk');
const FileUtils = require('../utils/FileUtils');
const TextUtils = require('../utils/TextUtils');
const FileGenerator = require('./FileGenerator');

function add (cwx, component, componentDir, srcDir) {
  const fixPath = TextUtils.fixPath(component);
  const className = TextUtils.parseClassName(fixPath);
  const dir = `${componentDir}${fixPath}/`;
  const indexFilePath = `${dir}index.js`;
  if (!FileUtils.isExist(indexFilePath)) {
    FileUtils.mkdir(dir);
    FileGenerator.component.gen(dir, className, srcDir);
    console.log(chalk.yellow(`Component:${component} gen success`));
  } else {
    console.log(chalk.white(`Component:${component} is exists`));
  }
}

module.exports = add;
