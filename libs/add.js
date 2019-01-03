const chalk = require('chalk');
const FileUtils = require('../utils/FileUtils');

// 分发添加模式
function add (cwx, config) {
  const START_TIME = Date.now();
  const srcDir = FileUtils.absolutePath(cwx, 'src');
  if (FileUtils.isExist(srcDir)) {
    const path = config.path;
    const module = config.module;
    const component = config.component;
    const appendMode = config.appendMode;
    if (module) { // 添加模块（页面）
      if (appendMode) { // 如果为append模式，则解析模块（页面）路径数组
        const modulePathList = module.split(',');
        modulePathList.forEach(modulePath => addModule(cwx, 'Page Title', modulePath, srcDir));
      } else {
        addModule(cwx, module, path, srcDir);
      }
    } else if (component) { // 添加组件
      if (appendMode) { // 如果为append模式，则解析组件路径数组
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

// 添加单个模块（页面）
function addModule (cwx, moduleTitle, modulePath, srcDir) {
  if (modulePath) {
    require('./AddModule')(cwx, moduleTitle, modulePath, FileUtils.absolutePath(srcDir, 'modules'), srcDir);
  } else {
    console.log(chalk.yellow('Please append -p option.'));
  }
}

// 添加单个组件
function addComponent (cwx, componentPath, srcDir) {
  require('./AddComponent')(cwx, componentPath, FileUtils.absolutePath(srcDir, 'components'), srcDir);
}

// 输出命令行规范
function logWarning () {
  console.log(chalk.yellow(`
Add Module:
eg: vues add -m Index -p /index

Add Component:
eg: vues add -c /home/index

Add multiple modules at a time：
eg: vues add -a -m /page/a,/page/b

Add multiple components at a time：
eg: vues add -a -c /home/index,/home/personal
`));
}

module.exports = add;
