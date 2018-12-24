const chalk = require('chalk');
const FileUtils = require('../utils/FileUtils');

function add (cwx, config) {
  const START_TIME = Date.now();
  const srcDir = FileUtils.absolutePath(cwx, 'src');
  if (FileUtils.isExist(srcDir)) {
    const path = config.path;
    const module = config.module;
    const component = config.component;
    if (module) {
      if (path) {
        require('./AddModule')(cwx, module, path, FileUtils.absolutePath(srcDir, 'modules'), srcDir);
      } else {
        console.log(chalk.yellow('Please append -p option.'));
      }
    } else if (component) {
      require('./AddComponent')(cwx, component, FileUtils.absolutePath(srcDir, 'components'), srcDir);
    } else {
      console.log(chalk.yellow(`
Add Module:
eg: vues add -m Index -p /index

Add Component:
eg: vues add -c /home/index`));
    }
  } else {
    console.log(chalk.red('Please run it on the project root directory.'));
  }
  console.log();
  console.log(chalk.green(`Time: ${chalk.bold.green(Date.now() - START_TIME)}ms`));
}

module.exports = add;
