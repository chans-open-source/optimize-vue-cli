const fs = require('fs');
const path = require('path');
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const FileUtils = require('../utils/FileUtils');

function create (cwd, name) {
  if (!FileUtils.isExist(name)) {
    const spinner = ora('Downloading template...');
    spinner.start();
    const absPath = path.resolve(cwd, name);
    download('direct:https://github.com/ChangedenCZD/optimize-vue.git#master', absPath, { clone: true }, err => {
      if (err) {
        spinner.fail();
        console.log(symbols.error, chalk.red(err));
      } else {
        spinner.succeed();
        const fileName = `${absPath}/package.json`;
        if (fs.existsSync(fileName)) {
          const packageFile = require(fileName);
          packageFile.name = name;
          fs.writeFileSync(fileName, JSON.stringify(packageFile, null, 2));
        }
        console.log(symbols.success, chalk.green('Template Download success.'));
      }
    });
  } else {
    // 错误提示项目已存在，避免覆盖原有项目
    console.log(symbols.error, chalk.red('Project already exists.'));
  }
}

module.exports = create;
