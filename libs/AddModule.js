const chalk = require('chalk');
const FileUtils = require('../utils/FileUtils');
const TextUtils = require('../utils/TextUtils');
const FileGenerator = require('./FileGenerator');

function add (cwd, title, path, moduleDir, srcDir) {
  const fixPath = TextUtils.fixPath(path);
  const className = TextUtils.parseClassName(fixPath);
  const dir = `${moduleDir}${fixPath}/`;
  const configFilePath = `${dir}module.config.json`;
  if (!FileUtils.isExist(configFilePath)) { // 创建模块
    FileUtils.mkdir(dir);
    FileGenerator.module.gen(dir, className, fixPath, title, srcDir);
    console.log(chalk.yellow(`Module:${path} gen success`));
  } else {
    console.log(chalk.white(`Module:${path} is exists`));
  }
}

module.exports = add;
