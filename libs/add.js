const chalk = require('chalk');
const FileUtils = require('../utils/FileUtils');

function add (cwx, config) {
  const START_TIME = Date.now();
  const srcDir = FileUtils.absolutePath(cwx, 'src');
  if (FileUtils.isExist(srcDir)) {
    const path = config.path;
    const module = config.module;
    const component = config.component;
    const appendMode = config.appendMode;
    if (module) {
      if (appendMode) {
        const modulePathList = module.split(',');
        modulePathList.forEach(modulePath => addModule(cwx, 'Page Title', modulePath, srcDir));
      } else {
        addModule(cwx, module, path, srcDir);
      }
    } else if (component) {
      if (appendMode) {
        const componentPathList = component.split(',');
        componentPathList.forEach(componentPath => addComponent(cwx, componentPath, srcDir));
      } else {
        addComponent(cwx, component, srcDir);
      }
    } else {
      logWarning();
    }
  } else {
    console.log(chalk.red('\nPlease run it on the project root directory.\n'));
  }
  console.log(chalk.green(`\nTime: ${chalk.bold.green(Date.now() - START_TIME)}ms\n`));
}

function addModule (cwx, moduleTitle, modulePath, srcDir) {
  if (modulePath) {
    require('./AddModule')(cwx, moduleTitle, modulePath, FileUtils.absolutePath(srcDir, 'modules'), srcDir);
  } else {
    console.log(chalk.yellow('Please append -p option.'));
  }
  // if (path) {
  //   require('./AddModule')(cwx, module, path, FileUtils.absolutePath(srcDir, 'modules'), srcDir);
  // } else {
  //   console.log(chalk.yellow('Please append -p option.'));
  // }
}

function addComponent (cwx, componentPath, srcDir) {
  require('./AddComponent')(cwx, componentPath, FileUtils.absolutePath(srcDir, 'components'), srcDir);
  // require('./AddComponent')(cwx, component, FileUtils.absolutePath(srcDir, 'components'), srcDir);
}

function logWarning () {
  console.log(chalk.yellow(`
Add Module:
eg: vues add -m Index -p /index

Add Component:
eg: vues add -c /home/index
`));
}

module.exports = add;
