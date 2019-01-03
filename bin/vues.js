#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version

// 基于 https://github.com/lin-xin/blog/issues/27

const Version = require('../package').version;
const program = require('commander');
const chalk = require('chalk');

const cwd = process.cwd();
program
// 输出版本号
.version(Version, '-v, --version')
// 设置命令行传参形式
.usage('<command> [options]');

program
// 配置项目创建命令
.command('create <app-name>')
.action(name => {
  require('../libs/create')(cwd, name);
});

program
// 配置添加命令
.command('add')
// 配置模块（页面）标题，当为append模式时，则是配置多个模块（页面）的路径数组（使用","分割）
.option('-m,--module <moduleTitle>', `Must append -p option. (eg: vues add -m Index -p /index)`)
// 配置模块（页面）路径，当为append模式时无效
.option('-p,--path <modulePath>', 'Only work in -m option. (eg: vues add -m Index -p /index)')
// 配置组件路径，当为append模式时，则是配置多个组件的路径数组（使用","分割）
.option('-c,--component <componentPath>', 'eg: vues add -c /home/index')
// .option('-cp,--component-path <componentPath>', '')
.option('-a,--append', '')
.action(name => {
  require('../libs/add')(cwd, {
    module: name.module,
    component: name.component,
    path: name.path,
    appendMode: name.append
  });
});

program
// 输出某个命令的帮助信息
.arguments('<command>')
.action((cmd) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

// 输出帮助信息
program.on('--help', () => {
  console.log();
  console.log(`  Run ${chalk.cyan(`vues <command> --help`)} for detailed usage of given command.`);
  console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

program.parse(process.argv);
